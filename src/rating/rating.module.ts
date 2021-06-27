import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { typeOrmConfig } from 'src/config/typeOrmConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { PassportModule } from '@nestjs/passport';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating, Product]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
