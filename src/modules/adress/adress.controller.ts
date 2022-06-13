import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AddressService } from './adress.service';
import { AddressDto } from './dto/create-adress.dto';
@ApiTags('Quận Huyện Api')
@ApiConsumes('Quận Huyện Api')
@Controller('address')
export class AddressController {
  constructor(private readonly adressService: AddressService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thành phố - {Thang}' })
  @ApiOkResponse({ status: 200 })
  async getCity(@Query() citycode: AddressDto) {
    return this.adressService.getCity(citycode);
  }
}
