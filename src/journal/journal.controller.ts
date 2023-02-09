import { Controller, Get, Post, Param, Req, Body } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './journal.dto';
import { Request, Response } from 'express';

@Controller('journals')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Get('userUID')
  async getJournalsByUserUID(@Param('userUID') userUID: string) {
    const journals = await this.journalService.getJournalsByUserUID(userUID);
    return journals;
  }

  @Post()
  async createJournal(@Body() createJournalDto: CreateJournalDto) {
    const journalCreated = await this.journalService.createJournal(
      createJournalDto,
    );
    return journalCreated;
  }
}
