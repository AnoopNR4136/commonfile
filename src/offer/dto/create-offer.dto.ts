import { Product } from "src/product/entities/product.entity";

export class CreateOfferDto {
  offer_startDate: string;
  offer_startTime: string;
  offer_endDate: string;
  offer_endTime: string;
  offer_offerPercentage: number;
  product_id: Product;
}
