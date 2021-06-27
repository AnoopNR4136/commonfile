import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/fileUpload';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './imagecategory',
        filename: editFileName, //method from common->editfile
      }),
    }),
  )
  createCategory(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Category | {}> {
    console.log(createCategoryDto);

    return this.categoryService.createCategory(createCategoryDto, file);
  }

  @Get('getCategory')
  getCategory(): Promise<Category | {}> {
    return this.categoryService.getCategory();
  }

  @Delete('deleteCategory/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(+id);
  }
  @Patch('updateCategory/:id')
  updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: number,
  ): Promise<Category | {}> {
    return this.categoryService.updateCategory(updateCategoryDto, id);
  }
}
