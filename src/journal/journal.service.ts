import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertOneWriteOpResult, MongoRepository } from 'typeorm';
import { Journal } from './journal.entity';
import { CreateJournalDto, UpdateJournalDto } from './journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: MongoRepository<Journal>,
  ) {}

  async getJournalsByUserUID(uid: string): Promise<Journal[]> {
    return this.journalRepository.findBy({ userUID: uid });
  }

  async findOne(id: string): Promise<Journal | null> {
    return this.journalRepository.findOneBy({ id });
  }

  async updateOne(updateJournal: UpdateJournalDto): Promise<Journal | null> {
    const currentJournal: any | null = await this.findOne(updateJournal.id);
    let updatedJournal = null;
    if (currentJournal) {
      console.log(currentJournal);
      const toBeUpdated: Omit<UpdateJournalDto, 'id'> = updateJournal;
      const oldJournal: any = currentJournal;
      oldJournal.id = currentJournal._id.toString();
      console.log(oldJournal.id);
      updatedJournal = await this.journalRepository.save({
        ...oldJournal,
        ...toBeUpdated,
      });
    }

    return updatedJournal;
  }

  async createJournal(body: CreateJournalDto): Promise<InsertOneWriteOpResult> {
    const newJournal: InsertOneWriteOpResult =
      await this.journalRepository.insertOne({
        ...body,
        ...{
          lastUpdate: Date.now(),
          creationDate: Date.now(),
          status: 'active',
          categories: [],
        },
      });
    return newJournal;
  }

  async removeJournal(id: string): Promise<DeleteResult> {
    return this.journalRepository.delete(id);
  }
}
