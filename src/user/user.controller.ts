import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './dto/get-user-decorator';
import { User } from './entities/user.entity';
import { CreateAdressDto } from './dto/create-user-adress.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{}> {
    return this.userService.signUp(createUserDto);
  }

  @Get('/login')
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard())
  @Post('/Addadress')
  userCreateAdress(
    @Body() createAddressDto: CreateAdressDto,
    @GetUser() user: User,
  ) {
    return this.userService.userCreateAdress(createAddressDto, user);
  }
  @UseGuards(AuthGuard())
  @Get('getAdress')
  getAdress(@GetUser() user: User) {
    return this.userService.getAdress(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
