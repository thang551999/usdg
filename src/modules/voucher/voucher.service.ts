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
      isActive: createVoucherDto.isActive ? createVoucherDto.isActive : 0,
      endDate: createVoucherDto.endDate,
      maxMoneySale: createVoucherDto.maxMoneySale,
      moneyCondition: createVoucherDto.moneyCondition,
      owner,
      place: createVoucherDto.place,
    });
    await this.voucherPlaceRepository.save(voucher);
    return voucher;
  }

  findAll() {
    return `This action returns all voucher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voucher`;
  }

  update(id: number, updateVoucherDto: UpdateVoucherDto) {
    return `This action updates a #${id} voucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`;
  }
}
