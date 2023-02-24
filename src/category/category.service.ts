import { Injectable } from '@nestjs/common';
import { prisma } from '../main';
import { Prisma } from '@prisma/client';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  private fieldsToBeSelected = {
    id: true,
    name: true,
    lastUpdate: true,
    comments: true,
  };

  async findAll(journalId: string): Promise<Category[] | null> {
    const categories = await prisma.categories.findMany({
      where: {
        journalId: journalId,
      },
      select: this.fieldsToBeSelected,
    });
    return categories;
  }

  async findOne(id: string): Promise<Category | null> {
    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
      select: this.fieldsToBeSelected,
    });
    return category;
  }

  async createCategory(
    journalId: string,
    body: Omit<Prisma.CategoriesCreateInput, 'journal'>,
  ): Promise<Category[]> {
    const categoryCreated = await prisma.journals.update({
      where: {
        id: journalId,
      },
      select: {
        categories: true,
      },
      data: {
        lastUpdate: new Date(Date.now()),
        categories: {
          create: {
            ...body,
          },
        },
      },
    });
    return categoryCreated.categories;
  }

  async updateOne(
    id: string,
    updateCategory: Prisma.CategoriesUpdateInput,
  ): Promise<Category | null> {
    const category = await prisma.categories.update({
      where: {
        id: id,
      },
      select: this.fieldsToBeSelected,
      data: updateCategory,
    });
    return category;
  }

  async deleteOne(id: string): Promise<Category> {
    return await prisma.categories.delete({
      where: {
        id: id,
      },
    });
  }
}
