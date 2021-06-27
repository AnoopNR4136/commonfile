import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Rating } from 'src/rating/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Wishlist, Rating]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
