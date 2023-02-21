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
import {
  CreateJournalDto,
  UpdateJournalDto,
  UpsertCategorieDto,
} from './journal.dto';
import { Prisma } from '@prisma/client';

@Controller('journals')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Get('/by-user/:userUID')
  async getJournalsByUserUID(
    @Param('userUID') userUID: string,
    @Response() res: any,
  ) {
    const journals = await this.journalService.getJournalsByUserUID(userUID);
    return res.status(200).json({ journals });
  }

  @Get(':journalUID')
  async getJournal(
    @Param('journalUID') journalUID: string,
    @Response() res: any,
  ) {
    const journal = await this.journalService.findOne(journalUID);
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
      console.log(e);
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

  @Post(':journalId/upsert-category')
  async upsertCategorie(
    @Param('journalId') journalId: string,
    @Body() upsertCategory: UpsertCategorieDto,
    @Response() res: any,
  ) {
    upsertCategory = { lastUpdate: new Date(Date.now()), ...upsertCategory };
    try {
      const newCategory = await this.journalService.upsertCategorie(
        journalId,
        upsertCategory,
      );
      return res.status(200).json(newCategory);
    } catch (e) {
      console.log(e);
      if (e.code === 'P2025') {
        return res.status(404).json({ message: 'Journal not found.' });
      } else {
        return res.status(500).json({ message: e });
      }
    }
  }
}
