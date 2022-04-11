import { Injectable } from '@nestjs/common';
import { CreateOwnerPlaceDto } from './dto/create-owner-place.dto';
import { UpdateOwnerPlaceDto } from './dto/update-owner-place.dto';

@Injectable()
export class OwnerPlaceService {
  create(createOwnerPlaceDto: CreateOwnerPlaceDto) {
    return 'This action adds a new ownerPlace';
  }

  findAll() {
    return `This action returns all ownerPlace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ownerPlace`;
  }

  update(id: number, updateOwnerPlaceDto: UpdateOwnerPlaceDto) {
    return `This action updates a #${id} ownerPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} ownerPlace`;
  }
}
