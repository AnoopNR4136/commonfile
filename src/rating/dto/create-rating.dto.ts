import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateRatingDto {
  product_id: Product;

  rating_value: number;

  comment_value: string;
}
