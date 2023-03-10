import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Response,
  Delete,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto, UpdateJournalDto } from './journal.dto';
import { Prisma } from '@prisma/client';

@Controller('journals')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Get('/by-user/:userId')
  async getJournalsByUserId(
    @Param('userId') userId: string,
    @Response() res: any,
  ) {
    const journals = await this.journalService.getJournalsByUserUID(userId);
    return res.status(200).json({ journals });
  }

  @Get(':journalId')
  async getJournal(
    @Param('journalId') journalId: string,
    @Response() res: any,
  ) {
    const journal = await this.journalService.findOne(journalId);
    if (journal !== null) {
      return res.status(200).json({ journal });
    } else {
      return res.status(404).json({ message: 'Journal not found.' });
    }
  }

  @Post('/create')
  async createJournal(
    @Body() createJournal: CreateJournalDto,
    @Response() res: any,
  ) {
    try {
      const data = {
        name: createJournal.name,
        status: 'active',
        creationDate: new Date(Date.now()),
        lastUpdate: new Date(Date.now()),
      };

      const journalCreated = await this.journalService.createJournal(
        data,
        createJournal.userId,
      );
      if (journalCreated) {
        return res.status(200).json(journalCreated);
      } else {
        return res
          .status(500)
          .json({ message: 'Unkown error during creation' });
      }
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }

  @Post('/update')
  async updateJournal(
    @Body() updateJournal: UpdateJournalDto,
    @Response() res: any,
  ) {
    try {
      const data: Prisma.JournalsUpdateInput = {
        name: updateJournal.name,
        status: updateJournal.status,
        lastUpdate: new Date(Date.now()),
      };
      const updateResult = await this.journalService.updateOne(
        updateJournal.id,
        data,
      );

      if (updateResult) {
        return res.status(200).json(updateResult);
      } else {
        return res.status(404).json({ message: 'Journal not found' });
      }
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }

  @Delete(':journalId')
  async deleteJournal(
    @Param('journalId') journalId: string,
    @Response() res: any,
  ) {
    try {
      await this.journalService.deleteJournal(journalId);
      return res.status(200).json({ message: 'Journal deleted' });
    } catch (e) {
      if (e.code === 'P2025') {
        return res.status(404).json({ message: 'Journal not found.' });
      } else {
        return res.status(500).json({ message: e });
      }
    }
  }
}
