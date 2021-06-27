import { Product } from 'src/product/entities/product.entity';
import { Order } from '../entities/order.entity';

export class oderDetailsArray {
  product_id: Product;
  oderDetail_total: number;
  oderDetail_qty: number;
  order_id: Order;
}
