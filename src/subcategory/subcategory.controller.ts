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
  UseGuards,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/fileUpload';
import { AuthGuard } from '@nestjs/passport';
import { Subcategory } from './entities/subcategory.entity';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post('createSubCategory')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './imagesubcategory',
        filename: editFileName, //method from common->editfile
      }),
    }),
  )
  createSubCategory(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);

    return this.subcategoryService.createSubCategory(
      createSubcategoryDto,
      file,
    );
  }

  @Get('getCategory/:id')
  getByCategory(@Param('id') id: string) {
    return this.subcategoryService.getByCategory(+id);
  }
  @Get('subCategoryView')
  subCategoryView(): Promise<Subcategory[]> {
    return this.subcategoryService.subCategoryView();
  }
}
