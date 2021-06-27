import { type } from 'os';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_wishlist')
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  wishlist_id: number;
  @ManyToOne((type) => User, (user) => user.wishlist_id)
  user_id: User;
  @ManyToOne((type) => Product, (product) => product.wishlist_id)
  product_id: Product;
}
