import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { categoryView } from './categoryInterface';
import { CommonFunction } from 'src/Common/fileProp';
import { exception } from 'console';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Category | {}> {
    try {
      const result = await this.categoryRepository.save({
        ...createCategoryDto,
        category_file: file.path,
      });
      return result;
    } catch (err) {
      // console.log(err);
      if (err.code === '23505') {
        throw new HttpException(
          {
            error: 'Category is already Exist !!!',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          {
            error: 'Server error',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getCategory(): Promise<Category | {}> {
    try {
      const result = await this.categoryRepository.find();
      const arr = new Array<categoryView>();

      result.forEach((res) => {
        const cat_inter: categoryView = {
          category_id: res.category_id,
          category_name: res.category_name,
        };
        arr.push(cat_inter);
      });
      console.log(result);
      return { arr };
    } catch (error) {}
  }
  async deleteCategory(id: number) {
    try {
      const findData = await this.categoryRepository.findOne({
        where: { category_id: id },
      });
      const image = findData.category_file;
      //Delete File Function calling
      const commonFunction = new CommonFunction();
      await commonFunction.deleteFile(image);
      await this.categoryRepository.delete({ category_id: id });
      const result = this.getCategory();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
    id: number,
  ): Promise<Category | {}> {
    try {
      const findID = await this.categoryRepository.findOne(id);
      if (findID) {
        console.log(findID);
        const update = await this.categoryRepository.save({
          ...findID,
          ...updateCategoryDto,
        });
        const result = this.getCategory();
        return result;
      }
    } catch (err) {
      // console.log(err);
      if (err.code === '23505') {
        throw new HttpException(
          {
            error: 'Category is already Exist !!!',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          {
            error: 'Server error',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
