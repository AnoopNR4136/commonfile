import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateGuestDto } from './dto/create-guest.dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './PayloadInterFace/JwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GuestService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(createGuestDto: CreateGuestDto): Promise<Object> {
    const { username, password } = createGuestDto;
    try {
      const findUser = await this.userRepository.findOne({
        where: [{ user_email: username }, { user_phone: username }],
      });

      console.log(findUser);

      if (findUser) {
        const salt = findUser.user_salt;
        const hashPassword = await bcrypt.hash(password, salt);
        if (hashPassword === findUser.user_password) {
          // console.log(true);
          const email = findUser.user_email;

          const payload: JwtPayload = { email: email };
          console.log(payload);

          const accessToken = await this.jwtService.sign(payload)
          console.log(accessToken);

          return { token: accessToken, role: 'user' };
        }
      } else {
        throw new NotFoundException({
          message: 'invalid UserName or Password',
        });
      }
    } catch (err) {
      console.error(err.response);

      return err;
    }
  }
}
