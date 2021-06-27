import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { orderDetails } from './entities/orderdetails.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/entities/user.entity';
import { TrackOrder } from './entities/track.order.entity';
import { TrackOrderDto } from './dto/create-track-order.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly oderRepository: Repository<Order>,

    @InjectRepository(orderDetails)
    private readonly oderdetRepository: Repository<orderDetails>,

    @InjectRepository(TrackOrder)
    private readonly trackOderRepository: Repository<TrackOrder>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      const oder_id = uuidv4();
      const user_Id = user.user_id as any;
      console.log(user_Id);

      const result = await this.oderRepository.save({
        order_id: oder_id,
        order_total: createOrderDto.oder_total,
        user_id: user_Id,
        adress_id: createOrderDto.adress_id,
      });

      const oderDetArray = createOrderDto.oderDetailsArray;
      oderDetArray.forEach((element) => {
        element.order_id = oder_id;
      });

      console.log('Order : ' + result);
      const result2 = await this.oderdetRepository.save(oderDetArray);
      console.log('order det : ' + result2);

      const result3 = this.cartRepository.find({
        where: { user_id: user.user_id },
      });

      await Promise.all(
        oderDetArray.map(async (element) => {
          console.log(element.product_id);

          const updateStock = await this.productRepository
            .createQueryBuilder()
            .update(Product)
            .set({
              product_stock: () => 'product_stock -' + element.oderDetail_qty,
              product_price: () => 'product_price +' + element.oderDetail_qty,
              // product_stock: 99,
            })
            .where('product_id=:id', { id: element.product_id })
            // .getSql();
            .execute();
        }),
      );

      if (result3) {
        this.cartRepository.delete({ user_id: user_Id });
      }

      const saveStatus = await this.oderRepository.save({
        order_id: oder_id as any,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async viewOrder(user: User) {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')

        .leftJoinAndSelect('order.orderdet_id', 'oderdet')
        .leftJoinAndSelect('oderdet.product_id', 'product')
        .where('order.user_id=:userid', { userid: user.user_id })
        .orderBy('order.order_date', 'DESC')

        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('error viewOrder :' + error);
    }
  }

  async trackOrder(oid: string) {
    try {
      const result = await this.trackOderRepository.find({
        where: { order_id: oid },
      });
      return result;
    } catch (error) {
      console.log('trackOrder : ' + error);
    }
  }

  async adminViewOrder(id: string) {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')

        .leftJoinAndSelect('order.orderdet_id', 'oderdet')
        .leftJoinAndSelect('oderdet.product_id', 'product')
        .where('order.order_id=:orderID', { orderID: id })

        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('error AdminviewOrder :' + error);
    }
  }

  async adminViewPendingOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .select([
          'order.order_id',
          'order.order_total',
          'oderdet.oderDetail_qty',
          'oderdet.oderDetail_total',
          'product.product_name',
          'product.product_price',
          'product.product_image',
        ])
        .leftJoin('order.orderdet_id', 'oderdet')
        .leftJoin('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 0 })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }

  async adminViewApprovedOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .select([
          'order.order_id',
          'order.order_total',
          'oderdet.oderDetail_qty',
          'oderdet.oderDetail_total',
          'product.product_name',
          'product.product_price',
          'product.product_image',
        ])
        .leftJoin('order.orderdet_id', 'oderdet')
        .leftJoin('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 1 })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }

  async adminViewDispatchedOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .select([
          'order.order_id',
          'order.order_total',
          'oderdet.oderDetail_qty',
          'oderdet.oderDetail_total',
          'product.product_name',
          'product.product_price',
          'product.product_image',
        ])
        .leftJoin('order.orderdet_id', 'oderdet')
        .leftJoin('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 2 })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }

  async adminViewOutOfDeliveryOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .select([
          'order.order_id',
          'order.order_total',
          'oderdet.oderDetail_qty',
          'oderdet.oderDetail_total',
          'product.product_name',
          'product.product_price',
          'product.product_image',
        ])
        .leftJoin('order.orderdet_id', 'oderdet')
        .leftJoin('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 3 })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }

  async adminViewDeliverdOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .select([
          'order.order_id',
          'order.order_total',
          'oderdet.oderDetail_qty',
          'oderdet.oderDetail_total',
          'product.product_name',
          'product.product_price',
          'product.product_image',
        ])
        .leftJoin('order.orderdet_id', 'oderdet')
        .leftJoin('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 4 })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }

  async adminViewCancelledOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .select([
          'order.order_id',
          'order.order_total',
          'oderdet.oderDetail_qty',
          'oderdet.oderDetail_total',
          'product.product_name',
          'product.product_price',
          'product.product_image',
        ])
        .leftJoin('order.orderdet_id', 'oderdet')
        .leftJoin('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 5 })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }
  async adminViewOderDetals(order_id: number) {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderdet_id', 'oderdet')
        .leftJoinAndSelect('oderdet.product_id', 'product')
        .where('order.order_id=:order_id', { order_id: order_id })
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      console.log('error viewOrder :' + error);
    }
  }

  async adminUpdateOrder(oderid: string, oder_status: number) {
    try {
      const findOrder = await this.oderRepository.find({
        where: {
          order_id: oderid,
        },
      });
      console.log(findOrder);
      const oder_id = oderid as any;
      if (findOrder) {
        const saveStatus = await this.oderRepository.save({
          order_id: oderid as any,
          order_status: oder_status,
        });

        let orderstatus = '';
        console.log('oder_status :  ' + oder_status);

        if (oder_status == 1) {
          orderstatus = 'Your Order is approved.Ready For Dispatch';
        }
        if (oder_status == 2) {
          orderstatus = 'your Items  Dispatched';
        }
        if (oder_status === 3) {
          orderstatus = 'Out of Delivery';
        }
        if (oder_status === 4) {
          orderstatus = 'Deliverd';
        }
        console.log('Ordestatus  :  ' + orderstatus);

        if (orderstatus) {
          const result = await this.trackOderRepository.save({
            order_id: oder_id,
            track_station: orderstatus,
          });
        }
      }
    } catch (error) {
      console.log('admin Update Error : ' + error);
    }
  }

  async adminUpdateStation(trackDto: TrackOrderDto) {
    try {
      const result = await this.trackOderRepository.save({ ...trackDto });
    } catch (error) {
      console.log('adminUpdateStation  : ' + error);
    }
  }

  async userCancelOrder(oderid: number) {
    try {
      const findOrder = await this.oderRepository.find({
        where: { order_id: oderid },
      });
      const oder_id = oderid as any;
      if (findOrder) {
        const saveStatus = await this.oderRepository.save({
          order_id: oder_id,
          order_status: 5,
        });
      }
    } catch (error) {
      console.log('oder cancel by user Error : ' + error);
    }
  }

  async adminViewPendinOrder() {
    try {
      const result = await this.oderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderdet_id', 'oderdet')
        .leftJoinAndSelect('oderdet.product_id', 'product')
        .where('order.order_status=:st', { st: 0 })
        .getMany();
      console.log(result);
    } catch (error) {
      console.log('admin ViewOrder :' + error);
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
