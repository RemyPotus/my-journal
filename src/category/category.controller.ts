import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Response,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':journalId')
  async getCategories(
    @Param('journalId') journalId: string,
    @Response() res: any,
  ) {
    const categories = await this.categoryService.findAll(journalId);
    if (categories !== null) {
      return res.status(200).json({ categories });
    } else {
      return res.status(404).json({ message: 'Journal not found.' });
    }
  }

  @Post('/create')
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
    @Response() res: any,
  ) {
    try {
      const data = {
        name: createCategory.name,
        lastUpdate: new Date(Date.now()),
      };

      const categoryCreated = await this.categoryService.createCategory(
        createCategory.journalId,
        data,
      );
      if (categoryCreated) {
        return res.status(200).json(categoryCreated);
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
  async updateCategory(
    @Body() updateCategory: UpdateCategoryDto,
    @Response() res: any,
  ) {
    try {
      const data = {
        name: updateCategory.name,
        lastUpdate: new Date(Date.now()),
      };
      const updateResult = await this.categoryService.updateOne(
        updateCategory.id,
        data,
      );

      if (updateResult) {
        return res.status(200).json(updateResult);
      } else {
        return res.status(404).json({ message: 'Category not found' });
      }
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }

  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: string,
    @Response() res: any,
  ) {
    try {
      await this.categoryService.deleteOne(categoryId);
      return res.status(200).json({ message: 'Category deleted' });
    } catch (e) {
      if (e.code === 'P2025') {
        return res.status(404).json({ message: 'Category not found.' });
      } else {
        return res.status(500).json({ message: e });
      }
    }
  }
}
