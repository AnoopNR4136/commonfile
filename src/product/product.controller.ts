import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/fileUpload';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './imageproduct',
        filename: editFileName, //method from common->editfile
      }),
    }),
  )
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.createProduct(createProductDto, file);
  }

  @Get('productView')
  productView() {
    return this.productService.productView();
  }

  @Get('getProductBySubCatId/:id')
  getProductBySubCatId(@Param('id') id: string) {
    return this.productService.getProductBySubCatId(+id);
  }

  @Get('getProductById/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(+id);
  }
  @Get('getRating/:id')
  findRating(@Param('id') id: string) {
    return this.productService.findRating(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
