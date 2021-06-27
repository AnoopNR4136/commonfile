import { type } from 'os';
import { UserAdress } from 'src/user/entities/user-adress.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { orderDetails } from './orderdetails.entity';
import { TrackOrder } from './track.order.entity';
@Entity('tbl_order')
export class Order extends BaseEntity {
  @PrimaryColumn()
  order_id: string;

  @Column({ default: 0 })
  order_status: number;

  @Column()
  order_total: number;

  @Column({ default: new Date() })
  order_date: Date;

  @ManyToOne((type) => User, (user) => user.order_id)
  user_id: User;

  @OneToMany((type) => orderDetails, (orderdet) => orderdet.order_id)
  orderdet_id: orderDetails;

  @OneToMany((type) => TrackOrder, (tracKorder) => tracKorder.order_id)
  track_id: TrackOrder[];

  @ManyToOne((type) => UserAdress, (userAdress) => userAdress.order_id)
  adress_id: UserAdress;
}
