import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
@Entity('tbl_trackorder')
export class TrackOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  track_id: number;
  @ManyToOne((type) => Order, (order) => order.track_id)
  order_id: Order;
  @Column({ default: 'Order is Placed' })
  track_station: string;
}
