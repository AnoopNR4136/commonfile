import { UserAdress } from 'src/user/entities/user-adress.entity';
import { User } from 'src/user/entities/user.entity';
import { oderDetailsArray } from './orderDetailsArray.dto';

export class CreateOrderDto {
  user_id: User;
  oder_total: number;
  adress_id: UserAdress;
  oderDetailsArray: Array<oderDetailsArray>;
}
