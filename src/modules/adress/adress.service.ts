import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AddressDto } from './dto/create-adress.dto';
import { DistrictDto } from './dto/district.dto';

@Injectable()
export class AddressService {
  async getCity(addressDto: AddressDto) {
    if (addressDto.districtCode) {
      return await this.getWards(addressDto.districtCode);
    }
    if (addressDto.cityCode) {
      return await this.getDistrict(addressDto.cityCode);
    }
    const city = await fs.readFileSync(
      'src/modules/adress/data/tinh_tp.json',
      'utf-8',
    );
    return Object.values(JSON.parse(city));
  }

  async getDistrict(cityCode) {
    const district = await fs.readFileSync(
      'src/modules/adress/data/quan_huyen.json',
      'utf-8',
    );
    const districtArr = Object.values(JSON.parse(district)).filter(
      (e: DistrictDto) => e.parent_code == cityCode,
    );
    return districtArr;
  }
  async getWards(district) {
    try {
      const wards = await fs.readFileSync(
        `src/modules/adress/data/xa-phuong/${district}.json`,
        'utf-8',
      );
      const wardsArr = Object.values(JSON.parse(wards)).filter(
        (e: DistrictDto) => e.parent_code == district,
      );
      return wardsArr;
    } catch (error) {
      return 'Không tồn tại xã/phường';
    }
  }
}
