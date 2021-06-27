import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subCategoryRepository: Repository<Subcategory>,
  ) {}

  async createSubCategory(
    createSubcategoryDto: CreateSubcategoryDto,
    file: Express.Multer.File,
  ) {
    try {
      const result = await this.subCategoryRepository.save({
        ...createSubcategoryDto,
        subcategory_file: file.path,
      });
      // console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getByCategory(id: number) {
    try {
      const result = await this.subCategoryRepository.find({
        where: { category_id: id },
      });
      // console.log(result);
      return result;
    } catch (error) {}
  }

  async subCategoryView(): Promise<Subcategory[]> {
    try {
      const result = await this.subCategoryRepository.find();
      //console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
