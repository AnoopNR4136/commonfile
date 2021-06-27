import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('tbl_cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ManyToOne((type) => User, (user) => user.cart_id)
  user_id: User;
  @ManyToOne((type) => Product, (product) => product.cart_id)
  product_id: Product;
  @Column({ default: 1 })
  cart_qty: number;
}
