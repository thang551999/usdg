import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';
import { OwnerAuthGuard } from '../auth/jwt.strategy';
import { CreateVoucherDto, GetVoucherOwner } from './dto/create-voucher.dto';
import { VoucherService } from './voucher.service';
import { API_SUCCESS } from '../../common/constant';

@Controller('owner/voucher')
@UseGuards(OwnerAuthGuard)
export class VoucherOwnerPlaceController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  async create(
    @Body() createVoucherDto: CreateVoucherDto,
    @UserInfo() user: IUserInfo,
  ) {
    const voucher = await this.voucherService.create(createVoucherDto, user);
    return {
      code: API_SUCCESS,
      data: voucher,
    };
  }

  @Get()
  async getVoucherCreate(
    @Query() getVoucher: GetVoucherOwner,
    @UserInfo() user: IUserInfo,
  ) {
    const vouchers = await this.voucherService.findAll(getVoucher, user);
    return {
      code: API_SUCCESS,
      data: vouchers,
    };
  }

  @Get(':id')
  getVoucherDetails() {
    return 0;
  }

  @Put(':id')
  updateVoucherCreate() {
    return 0;
  }

  @Delete(':id')
  async deleteVoucherCreate(
    @Param('id') id: string,
    @UserInfo() user: IUserInfo,
  ) {
    const vouchers = await this.voucherService.remove(id, user);
    return {
      code: API_SUCCESS,
      data: vouchers,
    };
  }
}
