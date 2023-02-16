import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ _id: new ObjectID(id) });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findOneBy({
      email: { $eq: email },
    });
    return user;
  }

  async create(body: CreateUserDto): Promise<boolean> {
    const userCreated = await this.userRepository.insertOne({
      ...body,
      creationDate: Date.now(),
      isActive: true,
    });

    if (userCreated.ops.length !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ _id: new ObjectID(id) });
  }
}
