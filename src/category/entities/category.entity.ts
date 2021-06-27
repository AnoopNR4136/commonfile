import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('tbl_category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true })
  category_name: string;

  @Column()
  category_file: string;

  @OneToMany((type) => Subcategory, (subcategory) => subcategory.category_id)
  subcategory_id: Subcategory[];
}
