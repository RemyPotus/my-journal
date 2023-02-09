import { Controller, Get, Post, Param, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userUID')
  async getJournalsByUserUID(@Param('userUID') userUID: string) {
    const user = await this.userService.findOne(userUID);
    return user;
  }
}
