import {

  HttpException,
  HttpStatus,
  Injectable,
  
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdressDto } from './dto/create-user-adress.dto';
import { UserAdress } from './entities/user-adress.entity';
import { UpdateAdressDto } from './dto/update-user-adrees.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAdress)
    private readonly adressRepository: Repository<UserAdress>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{}> {
    try {
      const user = new User();
      const salt = await bcrypt.genSalt();

      const hashPassword = await bcrypt.hash(createUserDto.user_password, salt);

      const insert = await this.userRepository.save({
        ...createUserDto,
        user_salt: salt,
        user_password: hashPassword,
      });
      console.log(insert);
      return insert;
    } catch (err) {
      // console.log(err);
      if (err.code === '23505') {
        throw new HttpException(
          // 'User name is already Exist !!!',
          {
            error: 'User name is already Exist !!!',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          {
            error: 'Server error',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async userCreateAdress(adressDto: CreateAdressDto, user: User) {
    try {
      const result = await this.adressRepository.save({
        user_id: user.user_id as any,
        ...adressDto,
      });
      return this.getAdress(user);
    } catch (error) {
      console.log('userCreateAdress : ' + error);
    }
  }
  async userUpdateAdress(adressDto: UpdateAdressDto, id: number) {
    try {
      const findID = await this.adressRepository.find({
        where: { adress_id: id },
      });
      if (findID) {
        const result = await this.adressRepository.save({
          adress_id: id,
          ...adressDto,
        });
      }
    } catch (error) {
      console.log('userUpdateAdress : ' + error);
    }
  }
  async getAdress(user: User) {
    try {
      const findAdress = await this.adressRepository.find({
        where: { user_id: user.user_id },
      });
      return findAdress;
    } catch (error) {
      console.log('getAdress : ' + error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
