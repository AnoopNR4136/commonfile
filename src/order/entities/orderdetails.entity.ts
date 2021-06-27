import { Product } from 'src/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
@Entity('tbl_orderdetails')
export class orderDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderdet_id: number;

  @ManyToOne((type) => Order, (order) => order.orderdet_id)
  order_id: Order;

  @ManyToOne((type) => Product, (product) => product.orderdet_id)
  product_id: Product;

  @Column()
  oderDetail_qty: number;

  @Column()
  oderDetail_total: number;
}
