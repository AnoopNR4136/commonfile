import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { orderDetails } from './entities/orderdetails.entity';
import { PassportModule } from '@nestjs/passport';
import { TrackOrder } from './entities/track.order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, orderDetails, TrackOrder, Cart, Product]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
