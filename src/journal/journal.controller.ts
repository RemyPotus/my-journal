import { Controller, Get, Post, Param, Body, Response } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto, UpdateJournalDto } from './journal.dto';

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
      const journalCreated = await this.journalService.createJournal(
        createJournal,
      );
      if (journalCreated.ops) {
        return res.status(200).json(journalCreated.ops);
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
      const updateResult = await this.journalService.updateOne(updateJournal);
      console.log(updateResult);

      // if (updateResult.value) {
      //   return res.status(200).json(updateResult.value);
      // } else {
      return res.status(404).json({ message: 'Journal not found' });
      // }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }
}
