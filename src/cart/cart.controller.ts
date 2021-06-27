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
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
@UseGuards(AuthGuard())
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/createCart')
  createCart(@Body() createCartDto: CreateCartDto, @GetUser() user: User) {
    return this.cartService.createCart(createCartDto, user);
  }

  @Get('/viewCart')
  viewCart(@GetUser() user: User) {
    return this.cartService.viewCart(user);
  }

  @Post('removeCart/:id')
  removeCart(@Param('id') id: string) {
    return this.cartService.removeCart(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
