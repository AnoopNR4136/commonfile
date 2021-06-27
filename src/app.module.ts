import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { GuestModule } from './guest/guest.module';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { RatingModule } from './rating/rating.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule,
    UserModule,
    GuestModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    CartModule,
    WishlistModule,

    OrderModule,

    RatingModule,

    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
