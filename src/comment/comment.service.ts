import { Injectable } from '@nestjs/common';
import { prisma } from '../main';
import { Prisma } from '@prisma/client';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  private fieldsToBeSelected = {
    id: true,
    date: true,
    texts: true,
  };

  /**
   * Finds all comments linked to a category
   * @param categoryId
   * @returns
   */
  async findAll(categoryId: string): Promise<Comment[] | null> {
    const comments = await prisma.comments.findMany({
      where: {
        categoryId: categoryId,
      },
      select: this.fieldsToBeSelected,
    });
    return comments;
  }

  async findOne(id: string): Promise<Comment | null> {
    const comment = await prisma.comments.findUnique({
      where: {
        id: id,
      },
      select: this.fieldsToBeSelected,
    });
    return comment;
  }

  async createComment(
    categoryId: string,
    body: Omit<Prisma.CommentsCreateInput, 'category'>,
  ): Promise<Comment[]> {
    const CommentCreated = await prisma.categories.update({
      where: {
        id: categoryId,
      },
      select: {
        comments: true,
      },
      data: {
        lastUpdate: new Date(Date.now()),
        comments: {
          create: {
            ...body,
          },
        },
      },
    });
    return CommentCreated.comments;
  }

  async updateOne(
    id: string,
    updateComment: Prisma.CommentsUpdateInput,
  ): Promise<Comment | null> {
    const Comment = await prisma.comments.update({
      where: {
        id: id,
      },
      select: this.fieldsToBeSelected,
      data: updateComment,
    });
    return Comment;
  }

  async deleteOne(id: string): Promise<Comment> {
    return await prisma.comments.delete({
      where: {
        id: id,
      },
    });
  }
}
