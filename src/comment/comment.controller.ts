import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Response,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':categoryId')
  async getCommentsByCategory(
    @Param('categoryId') categoryId: string,
    @Response() res: any,
  ) {
    const comments = await this.commentService.findAll(categoryId);
    if (comments !== null) {
      return res.status(200).json({ comments });
    } else {
      return res.status(404).json({ message: 'Caegory not found.' });
    }
  }

  @Post('/create')
  async createComment(
    @Body() createComment: CreateCommentDto,
    @Response() res: any,
  ) {
    try {
      const data = {
        date: new Date(Date.now()),
        texts: createComment.texts,
      };

      const commentCreated = await this.commentService.createComment(
        createComment.categoryId,
        data,
      );
      if (commentCreated) {
        return res.status(200).json(commentCreated);
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
  async updateComment(
    @Body() updateComment: UpdateCommentDto,
    @Response() res: any,
  ) {
    try {
      const updateResult = await this.commentService.updateOne(
        updateComment.id,
        { texts: updateComment.texts },
      );

      if (updateResult) {
        return res.status(200).json(updateResult);
      } else {
        return res.status(404).json({ message: 'Comment not found' });
      }
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }

  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @Response() res: any,
  ) {
    try {
      await this.commentService.deleteOne(commentId);
      return res.status(200).json({ message: 'Comment deleted' });
    } catch (e) {
      if (e.code === 'P2025') {
        return res.status(404).json({ message: 'Comment not found.' });
      } else {
        return res.status(500).json({ message: e });
      }
    }
  }
}
