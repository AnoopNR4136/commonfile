import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
