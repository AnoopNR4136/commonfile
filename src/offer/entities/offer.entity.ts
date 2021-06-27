import { Product } from 'src/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('tbl_offer')
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  offer_id: number;

  @Column({ type: 'date' })
  offer_startDate: string;

  @Column({ type: 'time' })
  offer_startTime: string;

  @Column({ type: 'date' })
  offer_endDate: string;

  @Column({ type: 'time' })
  offer_endTime: string;
  @Column()
  offer_offerPercentage: number;

  @ManyToOne((type) => Product, (product) => product.offer_id)
  product_id: Product;
}
