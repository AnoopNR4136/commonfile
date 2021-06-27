import { PartialType } from '@nestjs/mapped-types';
import { CreateAdressDto } from './create-user-adress.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateAdressDto extends PartialType(CreateAdressDto) {}
