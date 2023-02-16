import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { prisma } from '../main';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  findAll(): Promise<User[]> {
    return prisma.users.findMany();
  }

  findOne(id: string): Promise<any> {
    const users: any = prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }
  // Omit<Prisma.UsersCountAggregateOutputType, 'password' | '_all'>
  async create(body: Prisma.UsersCreateInput): Promise<boolean> {
    const userCreated = await prisma.users.create({
      data: body,
    });
    if (userCreated) {
      return true;
    }
    return false;
  }

  async remove(id: string): Promise<User> {
    return await prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
}
