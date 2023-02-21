import { Injectable } from '@nestjs/common';
import { Journal } from './journal.entity';
import { prisma } from '../main';
import { Prisma } from '@prisma/client';

@Injectable()
export class JournalService {
  async getJournalsByUserUID(userId: string): Promise<Journal[]> {
    const journals: Journal[] = await prisma.journals.findMany({
      where: {
        userId: userId,
      },
    });
    return journals;
  }

  async findOne(id: string): Promise<Journal | null> {
    const journal = await prisma.journals.findUnique({
      where: {
        id: id,
      },
    });
    return journal;
  }

  async updateOne(
    id: string,
    updateJournal: Prisma.JournalsUpdateInput,
  ): Promise<Journal | null> {
    const journal = await prisma.journals.update({
      where: {
        id: id,
      },
      data: updateJournal,
    });
    return journal;
  }

  async createJournal(
    body: Omit<Prisma.JournalsCreateInput, 'user'>,
    userId: string,
  ): Promise<Journal> {
    const newJournal = await prisma.journals.create({
      data: {
        ...body,
        user: { connect: { id: userId } },
      },
    });
    return newJournal;
  }

  async deleteJournal(id: string): Promise<Journal> {
    return await prisma.journals.delete({
      where: {
        id: id,
      },
    });
  }

  async upsertCategorie(journalId: string, body: any): Promise<Journal> {
    // const currentCategories = await prisma.journals.findFirst({
    //   select: {
    //     categories: true,
    //   },
    //   where: {
    //     id: journalId,
    //   },
    // });

    // currentCategories?.categories.filter((c: any) => {
    //   if(c.id === body.id)
    // });

    const newCategory = await prisma.journals.update({
      where: {
        id: journalId,
      },
      data: {
        lastUpdate: new Date(Date.now()),
        categories: {
          push: body,
        },
      },
    });
    return newCategory;
  }
}
