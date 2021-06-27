import { Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Product)
    private readonly productServiceRepository: Repository<Product>,

    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  addRating(createRatingDto: CreateRatingDto, user: User) {
    try {
      const result = this.ratingRepository.save({
        user_id: user.user_id as any,
        ...createRatingDto,
      });
    } catch (error) {
      console.log('addRating ; ' + error);
    }
  }

  async findAll() {
    try {
      const result = await this.productServiceRepository
        .createQueryBuilder('pdct')
        .leftJoin('select AVG(rating_value)', 'pdct.rating_id', 'rating')
        .getRawMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findRating(id: number) {
    try {
      const result = await this.ratingRepository.find({
        where: { product_id: id, rating_value: Not(0), comment_value: Not('') },
      });
      
      return result;
    } catch (error) {
      console.log('findrating : ' + error);
    }
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
