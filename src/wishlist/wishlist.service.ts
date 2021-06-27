import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, user: any) {
    const product_id = createWishlistDto.product_id;
    const findID = await this.wishlistRepository.findOne({
      where: {
        product_id,
        user_id: user.user_id,
      },
    });
    console.log(findID);
    if (findID) {
      const deleteData = await this.wishlistRepository.delete({
        product_id,
        user_id: user.user_id,
      });
    } else {
      const saveData = await this.wishlistRepository.save({
        product_id,
        user_id: user.user_id,
      });
    }
  }

  async getMyWishlist(user: User) {
    try {
      const result = await this.wishlistRepository.find({
        // select: ['product_id'],
        relations: ['product_id', 'user_id'],
        where: { user_id: user.user_id },
      });

      const arr = [];
      result.forEach((element) => {
        arr.push(element.product_id.product_id);
      });

      return arr;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
