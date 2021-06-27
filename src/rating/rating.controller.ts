import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @UseGuards(AuthGuard())
  @Post('addrating')
  addRating(@Body() createRatingDto: CreateRatingDto, @GetUser() user: User) {
    return this.ratingService.addRating(createRatingDto, user);
  }

  @Get('getRating')
  findAll() {
    return this.ratingService.findAll();
  }

  @Get('getRating/:id')
  findRating(@Param('id') id: string) {
    return this.ratingService.findRating(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
