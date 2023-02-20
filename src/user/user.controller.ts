import { Controller, Post, Body, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './user.dto';
import { User } from './user.entity';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Basic Auth
   * @param userLoggingIn email+password
   * @param res
   * @returns
   */
  @Post('/login')
  async login(@Body() userLoggingIn: LoginDto, @Response() res: any) {
    if (!userLoggingIn.email || !userLoggingIn.password) {
      return res.status(400).send({ message: 'Missing email or password.' });
    }
    const user: any = await this.userService.findByEmail(userLoggingIn.email);

    if (user === null) {
      return res.status(404).json({ message: 'No matching email found.' });
    } else {
      if (user.password === userLoggingIn.password) {
        delete user['password'];
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: 'Invalid password or email.' });
      }
    }
  }

  /**
   * Creates a new user if email not already in use
   * @param createUser firstname + lastname + email + password
   * @param res
   * @returns
   */
  @Post('/register')
  async register(@Body() createUser: CreateUserDto, @Response() res: any) {
    const userAlreadyExist: User | null = await this.userService.findByEmail(
      createUser.email,
    );
    if (userAlreadyExist === null) {
      try {
        const body: Prisma.UsersCreateInput = {
          ...createUser,
          creationDate: new Date(Date.now()),
          isActive: true,
        };
        const newUser: boolean = await this.userService.create(body);
        if (newUser) {
          return res
            .status(200)
            .json({ message: 'New user successfully created.' });
        }
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e });
      }
    } else {
      return res.status(403).json({ message: 'Email already in use.' });
    }
  }
}
