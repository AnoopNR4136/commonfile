import { Order } from 'src/order/entities/order.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('tbl_adress')
export class UserAdress extends BaseEntity {
  @PrimaryGeneratedColumn()
  adress_id: number;
  @ManyToOne((type) => User, (user) => user.adress_id)
  user_id: User;
  @Column()
  adress_name: string;

  @Column()
  adress_house_name: string;

  @Column()
  adress_place: string;

  @Column()
  adress_city: string;

  @Column()
  adress_district: string;

  @Column()
  adress_state: string;

  @Column()
  adress_zip: string;

  @Column()
  adress_alternate_phone?: string;

  @OneToMany((type) => Order, (oder) => oder.adress_id)
  order_id: Order[];
}
