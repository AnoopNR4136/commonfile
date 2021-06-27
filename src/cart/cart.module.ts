import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
