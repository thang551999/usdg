import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
import { Place } from '../place/entities/place.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(OwnerPlace)
    private ownerPlaceRepository: Repository<OwnerPlace>,
    @InjectRepository(Voucher)
    private voucherPlaceRepository: Repository<Voucher>,
  ) {}
  async create(createVoucherDto: CreateVoucherDto, userInfor) {
    console.log(createVoucherDto);
    const owner = await this.ownerPlaceRepository.findOne({
      where: {
        id: userInfor.relativeId,
        places: {
          id: createVoucherDto.place.id,
        },
      },
    });
    if (!owner) return false;
    const voucher = await this.voucherPlaceRepository.create({
      amount: createVoucherDto.amount,
      type: createVoucherDto.type,
      isActive: createVoucherDto.isActive ? 0 : 1,
      endDate: createVoucherDto.endDate,
      maxMoneySale: createVoucherDto.maxMoneySale,
      moneyCondition: createVoucherDto.moneyCondition,
      owner,
      place: createVoucherDto.place,
      name: createVoucherDto.name,
      value: createVoucherDto.value,
    });
    await this.voucherPlaceRepository.save(voucher);
    return voucher;
  }

  async findAll(getParams, user) {
    const vouchers = await this.voucherPlaceRepository.findAndCount({
      where: {
        owner: { id: user.relativeId },
      },
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
      relations: ['owner', 'place'],
    });
    return {
      total: vouchers[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: vouchers[0],
    };
  }

  findOne(id: string) {
    return this.voucherPlaceRepository.findOne({
      where: {
        id,
      },
      relations: ['place'],
    });
  }

  async update(id, voucher, user) {
    const isVoucherOwenr = await this.voucherPlaceRepository.findOne({
      where: {
        id: id,
        owner: {
          id: user.relativeId,
        },
      },
    });
    if (isVoucherOwenr) {
      return await this.voucherPlaceRepository.update({ id }, voucher);
    } else {
      return { message: 'Bạn không phải là chủ sân' };
    }
  }

  async remove(id: string, user) {
    const isVoucherOwenr = await this.voucherPlaceRepository.findOne({
      where: {
        id: id,
        owner: {
          id: user.relativeId,
        },
      },
    });
    if (isVoucherOwenr) {
      return await this.voucherPlaceRepository.update(
        { id },
        { place: null, owner: null },
      );
    } else {
      return { message: 'Bạn không phải là chủ sân' };
    }
  }
}
