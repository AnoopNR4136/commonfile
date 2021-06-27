import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('/signIn')
  signIn(@Body() createGuestDto: CreateGuestDto): Promise<Object> {
    console.log(createGuestDto);

    return this.guestService.signIn(createGuestDto);
  }
}
