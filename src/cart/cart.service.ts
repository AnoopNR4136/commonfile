import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartServiceRepository: Repository<Cart>,
  ) {}

  createCart(createCartDto: CreateCartDto, user: any) {
    try {
      return this.cartServiceRepository.save({
        ...createCartDto,
        user_id: user.user_id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async viewCart(user: User) {
    try {
      const result = await this.cartServiceRepository.find({
        relations: ['product_id'],
        where: { user_id: user.user_id },
      });
      return result;
    } catch (error) {
      console.log('error viewcart :' + error);
    }
  }

  async removeCart(id: number) {
    try {
      await this.cartServiceRepository.delete(id);
    } catch (error) {
      console.log('removeCart  : ' + error);
    }
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
