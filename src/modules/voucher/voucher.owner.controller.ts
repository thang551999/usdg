import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';
import { OwnerAuthGuard } from '../auth/jwt.strategy';
import { CreateVoucherDto } from './dto/create-voucher.dto';
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
  async getVoucherCreate() {
    return 0;
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
  deleteVoucherCreate() {
    return 0;
  }
}
