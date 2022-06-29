import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseGuards,
  Query,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AppotaService } from './appota.service';
import {
  CreatePaymentDto,
  CreateAppotaDto,
  GetParams,
  CreateVnpay,
} from './dto/create-vnpay.dto';
import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt.strategy';
import { IUserInfo, UserInfo } from 'src/common/decorators/user.decorator';
import { ReturnIPNDto } from './dto/return-ipn.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('payment/')
export class AppotaController {
  constructor(private readonly vnpayService: AppotaService) {}

  @Post('vnpay/create-payment')
  @ApiOperation({ summary: '{Thang}' })
  @UseGuards(JwtAuthGuard)
  async createPaymentVnpay(
    @Body() createVnpayDto: CreateVnpay,
    @UserInfo() user: IUserInfo,
    @Req() req,
  ) {
    try {
      console.log(38);
      return this.vnpayService.createPaymentVnpayUrl(req, createVnpayDto, user);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('vnpay/return-url')
  @ApiOperation({ summary: '{Thang}' })
  async ReturnUrlVnpay(@Query() query: any, @Res() res) {
    return this.vnpayService.returnUrl(query, res);
  }

  @Get('vnpay/ipn')
  @ApiOperation({ summary: '{Thang}' })
  async vnpayIpn(@Req() req) {
    return this.vnpayService.returnIpn(req);
  }

  @Get('admin/vnpay')
  @ApiOperation({ summary: '{Thang}' })
  async getAllHistoryOrder(@Query() getPram: GetParams) {
    return this.vnpayService.getPaymentAdmin(getPram);
  }

  // @Post('appotapay/create-payment-order')
  // @ApiOperation({ summary: '{Thang}' })
  // async createPaymentOrder(
  //   @Body() createVnpayDto: CreatePaymentDto,
  //   @UserInfo() user: IUserInfo,
  // ) {
  //   return this.vnpayService.paymentOrder(createVnpayDto);
  // }

  // @Post('appotapay/return-ipn-order')
  // @ApiOperation({ summary: '{Thang}' })
  // @HttpCode(200)
  // async returnIpnOrder(@Body() ipn: ReturnIPNDto) {
  //   return this.vnpayService.returnIPNOrder(ipn);
  // }

  // @Get('appotapay/return-url')
  // @ApiOperation({ summary: '{Thang}' })
  // async returnUrl(@Query() query, @Res() res) {
  //   return res.redirect(`${process.env.urlPayment}/${query.orderId}`);
  // }
  // @Post('appotapay/return-ipn')
  // @ApiOperation({ summary: '{Thang}' })
  // @HttpCode(200)
  // async returnIPN(@Body() ipn: ReturnIPNDto) {
  //   return this.vnpayService.returnIPN(ipn);
  // }

  // @Get('appotapay/history/:id')
  // @ApiOperation({ summary: '{Thang}' })
  // @HttpCode(200)
  // //@UseGuards(JwtAuthGuard)
  // async traceTransaction(@Param('id') id: string) {
  //   return this.vnpayService.historyCharge(id);
  // }
  // @Get('admin/appotapay')
  // @ApiOperation({ summary: '{Thang}' })
  // @UseGuards(AdminAuthGuard)
  // async getPaymentAdmin(@Query() getParams: GetParams) {
  //   return this.vnpayService.getPaymentAdmin(getParams);
  // }
}
