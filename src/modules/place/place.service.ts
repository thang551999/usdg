import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { API_FAIL, PLACE_MESSAGE, ROLE } from '../../common/constant';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GetPlaceParams } from './dto/get-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { TypePlace } from './entities/type-place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    @InjectRepository(TypePlace)
    private typePlaceRepository: Repository<TypePlace>,
    @InjectRepository(OwnerPlace)
    private ownerPlaceRepository: Repository<OwnerPlace>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createPlaceDto: CreatePlaceDto, user) {
    console.log(user);
    const owner = await this.ownerPlaceRepository.findOne({
      where: { id: user.relativeId },
    });

    const place = await this.placeRepository.create({
      owner,
      ...createPlaceDto,
    });
    await this.placeRepository.save(place);
    return place;
  }
  async createOrder() {
    // Kiểm tra tiền trong tk
    // Kiểm tra giờ đặt có trống
    // Gửi mail cho admin
    return 1;
  }

  async confirmOrder(token, orderId) {
    const payload = await this.jwtService.verify(token);
    if (payload.role !== ROLE.owner) {
      return API_FAIL;
    }
  }

  async findAll(getParams: GetPlaceParams) {
    const places = await this.placeRepository.findAndCount({
      where: {
        isEnable: true,
      },
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
      relations: ['typePlace', 'timeGold'],
    });
    return {
      total: places[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: places[0],
    };
  }

  async findOne(id: string) {
    const place = await this.placeRepository.findOne({
      where: {
        isEnable: true,
        id,
      },
      relations: ['services', 'timeGold', 'owner', 'comments', 'voucherCreate'],
    });
    return place;
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  async remove(id: string, user) {
    const place = await this.placeRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });
    if (place.owner.id === user.relativeId) {
      await this.placeRepository.update(id, {
        isEnable: false,
      });
    }
    return PLACE_MESSAGE.DISABLE_SUCCESS;
  }

  async createTypePlace(data) {
    const typePlace = await this.typePlaceRepository.create(data);
    await this.typePlaceRepository.save(typePlace);
    return typePlace;
  }

  async getTypePlaceAdmin() {
    const typePlace = await this.typePlaceRepository.find({
      where: {
        isDeleted: false,
      },
    });
    return typePlace;
  }

  async getTypePlace() {
    const typePlace = await this.typePlaceRepository.find({
      where: {
        isDeleted: false,
        isActive: true,
      },
    });
    return typePlace;
  }
}
