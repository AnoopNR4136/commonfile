import { type } from 'os';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('tbl_subcategory')
export class Subcategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  subcategory_id: number;

  @Column()
  subcategory_name: string;

  @Column()
  subcategory_file: string;

  @ManyToOne((type) => Category, (category) => category.subcategory_id)
  category_id: Category;

  @OneToMany((type) => Product, (pdct) => pdct.subcategory_id)
  product_id: Product[];
}
