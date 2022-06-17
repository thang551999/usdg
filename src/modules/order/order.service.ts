import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { getConnection, Repository } from 'typeorm';
import { ORDER_MESSAGE, ORDER_STATUS, TypeOrder } from '../../common/constant';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
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
    @InjectRepository(OwnerPlace)
    private onwerPlaceRepository: Repository<OwnerPlace>,
  ) {}
  async create(createOrderDto: CreateOrderDto, userInfor) {
    const place = await this.placeRepository.findOne({
      where: { id: createOrderDto.place.id },
      relations: ['timeGold', 'owner'],
    });
    const { moneyTimes, timeBlocks } = this.getPriceTimes(
      createOrderDto.timeBooks,
      place.timeGold,
      place.priceMin,
      createOrderDto.orderDay,
      place,
    );
    const priceServices = this.getPriceServices(createOrderDto.services);
    const money = new BigNumber(moneyTimes)
      .plus(new BigNumber(priceServices))
      .toString();

    const user = await this.customerRepository.findOne({
      where: {
        id: userInfor.relativeId,
      },
    });
    if (new BigNumber(user.money).isLessThan(new BigNumber(money)))
      return ORDER_MESSAGE.NOT_ENOUGH_MONEY;
    // if (this.checkExitOrder(createOrderDto.orderDay, createOrderDto.timeStart))
    //   return ORDER_MESSAGE.TIME_AVAILABILITY;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await this.orderPlaceRepository.create({
        money: new BigNumber(money).toString(),
        customer: user,
        place: createOrderDto.place,
        timeStart: createOrderDto.timeStart,
        dayOrder: new Date(createOrderDto.orderDay),
        status: ORDER_STATUS.OK,
        phoneNumber: createOrderDto.phoneNumber,
        type: TypeOrder.PaymentWithWallet,
        timeBlocks: timeBlocks,
        historyServices: createOrderDto.services,
      });
      await this.orderPlaceRepository.save(order);
      await this.onwerPlaceRepository.update(
        { id: place.owner.id },
        {
          money: new BigNumber(place.owner.money)
            .plus(new BigNumber(money))
            .toString(),
        },
      );
      await this.customerRepository.update(
        { id: user.id },
        {
          money: new BigNumber(user.money)
            .minus(new BigNumber(money))
            .toString(),
        },
      );
      await queryRunner.manager.save(order);
      // await queryRunner.manager.save(updateMoney);
      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return { error: 'error' };
  }

  getPriceServices(services) {
    return services.reduce(
      (moneny, service) =>
        new BigNumber(service.price).plus(new BigNumber(moneny)),
      0,
    );
  }

  getPriceTimes(times, timeGold, priceMin, dayOrder, place) {
    let money = '';
    const timeBlocks = times.map((time) => {
      const price = this.getPriceTimeBlock(timeGold, time, priceMin);
      money = new BigNumber(money).plus(new BigNumber(price)).toString();
      return {
        timeStart: time,
        dayOrder,
        price,
        place,
      };
    });
    return {
      timeBlocks,
      moneyTimes: money,
    };
  }

  getPriceTimeBlock(timeGold, timeStart, priceMin) {
    let money = '';
    const isTimeGold = timeGold.find(
      (e) => e.timeStart == timeStart.toString(),
    );
    if (isTimeGold) {
      money = isTimeGold.price;
    } else {
      money = priceMin;
    }
    return money;
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
  async checkExitOrder(day, timeStart) {
    const isOrder = await this.orderPlaceRepository.findOne({
      where: {
        dayOrder: day,
        timeStart: timeStart,
      },
    });
    if (isOrder) return true;
    return false;
  }

  async useService() {
    return 1;
  }

  async calcVoucher() {
    return 1;
  }

  async calcMoney() {
    return 1;
  }
}
