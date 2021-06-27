import { Product } from 'src/product/entities/product.entity';

export class CreateCartDto {
  cart_qty: number;
  product_id: Product;
}
