import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Rating } from 'src/rating/entities/rating.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productServiceRepository: Repository<Product>,

    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,

    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    try {
      const result = await this.productServiceRepository.save({
        ...createProductDto,
        product_image: file.path,
      });
      // console.log(result);

      return result;
    } catch (error) {}
  }

  async productView() {
    try {
      const result = await this.productServiceRepository.find({
        where: { product_stock: MoreThan(5) },
      });
      const result2 = await this.ratingRepository
        .createQueryBuilder('rating')

        .select('rating.product_id')
        .addSelect('AVG(rating.rating_value)', 'avg')
        .addSelect('COUNT(*)', 'count')
        .groupBy('rating.product_id')
        .getRawMany();
      result.forEach((element) => {
        element.numberof_rate = 0;
        result2.forEach((el2) => {
          //
          if (element.product_id === el2.rating_productIdProductId) {
            element.product_rating = Math.round(el2.avg);
            element.numberof_rate = el2.count;
          }
        });
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductBySubCatId(id: number) {
    try {
      const result = await this.productServiceRepository.find({
        where: { subcategory_id: id },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id: number) {
    try {
      // const result = await this.productServiceRepository.find({
      //   where: { product_id: id },
      // });
      // console.log(result);
      // return result;

      const result = await this.productServiceRepository
        .createQueryBuilder('pdct')
        .leftJoin('pdct.rating_id', 'rating')
        .addSelect('ROUND(AVG(rating.rating_value))', 'rating_value')
        .addSelect('COUNT(*)', 'user')
        .where('pdct.product_id=:id', { id: id })
        .groupBy('pdct.product_id')

        .execute();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async findRating(id: number) {
    const rate = 0;
    const cmnt = '';
    try {
      const result = await this.productServiceRepository
        .createQueryBuilder('pdct')
        .select([
          'user.user_email',
          'rating.rating_value',
          'rating.comment_value',
        ])
        .leftJoin('pdct.rating_id', 'rating')
        .leftJoin('rating.user_id', 'user')
        .where('product_id=:id', { id: id })
        .andWhere('rating.rating_value!=:val', { val: rate })
        .andWhere('rating.comment_value!=:va', { va: '' })
        .execute();

      return result;
    } catch (error) {
      console.log('findrating : ' + error);
    }
  }
}
