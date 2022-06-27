import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { SystemConfigDto } from './dto/system-config.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import SystemConfigEntity from './entities/system-config.entity';
import { ORDER_STATUS } from '../../common/constant';
import { Place } from '../place/entities/place.entity';
import { BigNumber } from 'bignumber.js';
import { sub } from 'date-fns';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(SystemConfigEntity)
    private systemConfigRepository: Repository<SystemConfigEntity>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}
  async getSystemConfig() {
    const systemConfig = await this.systemConfigRepository.findOne({
      where: {},
    });
    if (systemConfig) {
      return systemConfig;
    } else {
      return {
        gasFee: '0',
        dateRefundMoney: 30,
      };
    }
    return 'This action adds a new admin';
  }

  async updateConfig(systemConfig: SystemConfigDto) {
    const isExistSystemConfig = await this.systemConfigRepository.findOne({
      where: {},
    });
    if (isExistSystemConfig) {
      await this.systemConfigRepository.update(
        {
          id: isExistSystemConfig.id,
        },
        {
          gasFee: systemConfig.gasFee,
          dateRefundMoney: systemConfig.dateRefundMoney,
        },
      );
    } else {
      const system = await this.systemConfigRepository.create(systemConfig);
      await this.systemConfigRepository.save(system);
    }
    return systemConfig;
  }

  async getRevenue(month) {
    const orders = await this.orderRepository.find({
      where: {
        createAt: Between(new Date(month.dateStart), new Date(month.dateEnd)),
        status: ORDER_STATUS.OK,
      },
    });
    const revenue = orders.reduce((_cash, order) => {
      if (order.totalPrice == 'NaN' || order.totalPrice == '')
        return new BigNumber(_cash).toString();
      return new BigNumber(_cash)
        .plus(new BigNumber(order.totalPrice))
        .toString();
    }, '0');
    const gasFee = orders.reduce((_cash, order) => {
      if (order.gasFee == 'NaN' || order.gasFee == '')
        return new BigNumber(_cash).toString();
      return new BigNumber(_cash).plus(new BigNumber(order.gasFee)).toString();
    }, '0');
    return { revenue, orders: orders.length, gasFee };
  }

  getPlaces() {
    return this.placeRepository.findBy({ isDeleted: false, isEnable: true });
  }

  async getLoans() {
    const systemConfig = await this.systemConfigRepository.findOne({});
    const dateNeedPay = sub(new Date(), {
      days: systemConfig.dateRefundMoney ? systemConfig.dateRefundMoney : 15,
    });
    const orders = await this.orderRepository.find({
      where: {
        createAt: LessThan(dateNeedPay),
        status: ORDER_STATUS.OK,
      },
    });
    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
