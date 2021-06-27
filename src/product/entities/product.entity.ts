import { Cart } from 'src/cart/entities/cart.entity';
import { Offer } from 'src/offer/entities/offer.entity';

import { Order } from 'src/order/entities/order.entity';
import { orderDetails } from 'src/order/entities/orderdetails.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('tbl_product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;
  @Column()
  product_price: number;
  @Column()
  product_stock: number;
  @Column({ default: 0 })
  product_rating: number;
  @Column({ default: true })
  product_status: boolean;
  @Column()
  product_description: string;

  @Column('simple-array')
  product_features: string[];

  @Column()
  product_image: string;
  @Column({ default: false })
  wish_status: boolean;

  @ManyToOne((type) => Subcategory, (subcat) => subcat.product_id)
  subcategory_id: Subcategory;

  @OneToMany((type) => Cart, (cart) => cart.product_id)
  cart_id: Cart;

  @OneToMany((type) => Wishlist, (wishlist) => wishlist.product_id)
  wishlist_id: Wishlist[];

  @OneToMany((type) => orderDetails, (order) => order.product_id)
  orderdet_id: orderDetails[];

  @OneToMany((type) => Rating, (rating) => rating.product_id)
  rating_id: Rating[];

  @OneToMany((type) => Offer, (offer) => offer.product_id)
  offer_id: Offer[];

  //No of rated users
  numberof_rate: number;
}
