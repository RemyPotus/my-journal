import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Journal } from './journal.entity';
import { CreateJournalDto } from './journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: MongoRepository<Journal>,
  ) {}

  async getJournalsByUserUID(uid: string): Promise<Journal[]> {
    return this.journalRepository.findBy({ userUID: uid });
  }

  async findOne(id: number): Promise<Journal | null> {
    return this.journalRepository.findOneBy({ _id: id });
  }

  async createJournal(body: CreateJournalDto): Promise<Journal | null> {
    try {
      const newJournal = await this.journalRepository.insertOne({
        ...body,
        ...{
          lastUpdate: Date.now(),
          creationDate: Date.now(),
          status: 'active',
          categories: [],
        },
      });
      console.log(newJournal);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async removeJournal(id: string): Promise<void> {
    await this.journalRepository.delete(id);
  }
}
