import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { Repository } from 'typeorm';
import { ORDER_MESSAGE, ORDER_STATUS, TypeOrder } from '../../common/constant';
import { Place } from '../place/entities/place.entity';
import { Customer } from '../users/entities/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(Order)
    private orderPlaceRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createOrderDto: CreateOrderDto, userInfor) {
    const money = 0; // tinh tien
    const user = await this.customerRepository.findOne({
      where: {
        id: userInfor.relativeId,
      },
    });
    if (new BigNumber(user.money).isLessThan(new BigNumber(money)))
      return ORDER_MESSAGE.NOT_ENOUGH_MONEY;
    const order = await this.orderPlaceRepository.create({
      money: new BigNumber(money).toString(),
      customer: user,
      place: createOrderDto.place,
      timeStart: createOrderDto.timeStart,
      timeEnd: createOrderDto.timeEnd,
      dayOrder: createOrderDto.dayOrder,
      status: ORDER_STATUS.OK,
      phoneNumber: createOrderDto.phoneNumber,
      type: TypeOrder.PaymentWithWallet,
    });
    await this.orderPlaceRepository.save(order);
    return order;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
