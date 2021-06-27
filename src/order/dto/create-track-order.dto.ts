import { Order } from '../entities/order.entity';

export class TrackOrderDto {
  order_id: Order;
  track_station: string;
}
