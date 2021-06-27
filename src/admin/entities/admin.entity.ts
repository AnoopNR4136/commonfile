import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumnCannotBeNullableError,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
@Entity('tbl_admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column()
  admin_name: string;
  @Column()
  admin_password: string;
}
