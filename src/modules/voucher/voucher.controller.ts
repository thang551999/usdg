import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { API_SUCCESS } from '../../common/constant';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // @Get()
  // findAll() {
  //   return this.voucherService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const voucher = await this.voucherService.findOne(id);
    return {
      code: API_SUCCESS,
      data: voucher,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(+id, updateVoucherDto);
  }
}
