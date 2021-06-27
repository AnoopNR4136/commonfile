import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { TrackOrderDto } from './dto/create-track-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard())
  @Post('createOrder')
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    console.log('adress : ' + createOrderDto.adress_id);

    return this.orderService.create(createOrderDto, user);
  }

  @UseGuards(AuthGuard())
  @Get('viewOrder')
  viewOrder(@GetUser() user: User) {
    return this.orderService.viewOrder(user);
  }
  @Get('trackOrder/:id')
  trackOrder(@Param('id') id: string) {
    return this.orderService.trackOrder(id);
  }

  //admin View Order
  @Get('adminViewOrder/:id')
  adminViewOrder(@Param('id') id: string) {
    return this.orderService.adminViewOrder(id);
  }

  @Get('adminViewPendingOrder')
  adminViewPendingOrder() {
    return this.orderService.adminViewPendingOrder();
  }

  @Get('adminViewApprovedOrder')
  adminViewApprovedOrder() {
    return this.orderService.adminViewApprovedOrder();
  }

  @Get('adminViewDispacthedOrder')
  adminViewDispacthedOrder() {
    return this.orderService.adminViewDispatchedOrder();
  }
  @Get('adminViewOutOfDeliveryOrder')
  adminViewOutOfDeliveryOrder() {
    return this.orderService.adminViewOutOfDeliveryOrder();
  }

  @Get('adminViewDeliverdOrder')
  adminViewDeliverdOrder() {
    return this.orderService.adminViewDeliverdOrder();
  }

  @Get('adminViewCanceledOrder')
  adminViewCancelledOrder() {
    return this.orderService.adminViewCancelledOrder();
  }

  @Post('adminUpdateOrder/:id/:status')
  adminUpdateOrder(@Param('id') id: string, @Param('status') status: number) {
    console.log(' ' + id + ' ' + status);
    return this.orderService.adminUpdateOrder(id, status);
  }

  @Post('adminUpdateSation')
  adminUpdateSation(@Body() trackDto: TrackOrderDto) {
    return this.orderService.adminUpdateStation(trackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
