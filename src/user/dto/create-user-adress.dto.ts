import { User } from '../entities/user.entity';

export class CreateAdressDto {
  adress_name: string;
  adress_house_name: string;
  adress_place: string;
  adress_city: string;
  adress_district: string;
  adress_state: string;
  adress_zip: string;
  adress_alternate_phone?: string;
}
