import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './PayloadInterFace/JwtPayload';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(paylod: JwtPayload) {
    const { email } = paylod;
    console.log("Payload:"+email);

    const userResult = await this.userRepository.findOne({
      where: [{ user_email: email }, { user_phone: email }],
    });
    if (userResult) {
      return userResult;
    } else {
      throw new UnauthorizedException('Unauthorized Action');
    }

    //     console.log(user)
    //     if(!user){
    //         throw new UnauthorizedException('Not Found');
    //     }
    //     else{
    //         return user;
    //     }
  }
}
