import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {
  CreatePaymentDto,
  CreateAppotaDto,
  GetParams,
} from './dto/create-vnpay.dto';
import { InjectRepository } from '@nestjs/typeorm';
import HistoryAppotaTransaction from './entities/history-appota.entity';
import { getConnection, Repository } from 'typeorm';
import * as CryptoJS from 'crypto-js';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ReturnIPNDto } from './dto/return-ipn.dto';
import { OrderStatus, PaymentStatus } from '../../common/constant';
import { Order } from '../order/entities/order.entity';
import { Customer } from '../users/entities/customer.entity';
@Injectable()
export class AppotaService {
  @InjectRepository(HistoryAppotaTransaction)
  private orderTable: Repository<HistoryAppotaTransaction>;
  @InjectRepository(Order)
  private orderTableResponse: Repository<Order>;
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;
  @InjectRepository(Customer)
  private customerRepository: Repository<Customer>;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async getPaymentAdmin(getParams: GetParams) {
    const historyPayment = await this.orderTable.findAndCount({
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
    });
    return {
      total: historyPayment[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: historyPayment,
    };
  }
  async createPaymentUrl(createVnpayDto: CreateAppotaDto, userId) {
    const token = await this.jwtService.signAsync(
      {
        iss: process.env.appotaPartnerCode,
        jti: process.env.appotaApiKey + '-' + new Date().getTime(),
        api_key: process.env.appotaApiKey,
      },
      {
        expiresIn: '10m',
        header: {
          alg: 'HS256',
          typ: 'JWT',
          cty: 'appotapay-api;v=1',
        },
        secret: process.env.appotaSecretKey,
      },
    );
    const user = await this.customerRepository.findOne(userId);
    const order = await this.orderTable.create({
      money: createVnpayDto.amount.toString(),
      status: '0',
      user: user,
    });

    await this.orderTable.save(order);
    const dataSignature = `amount=${createVnpayDto.amount}&bankCode=&clientIp=${process.env.ip}&extraData=&notifyUrl=${process.env.appotaIPNUrl}&orderId=${order.id}&orderInfo=naptienvnsup&paymentMethod=&redirectUrl=${process.env.appotaReturnUrl}`;

    const hmac = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(dataSignature, process.env.appotaSecretKey),
    );
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-APPOTAPAY-AUTH': `Bearer ${token}`,
      },
    };
    try {
      const body = {
        amount: createVnpayDto.amount,
        orderId: order.id,
        orderInfo: 'naptienvnsup',
        bankCode: '',
        paymentMethod: '',
        clientIp: process.env.ip,
        extraData: '',
        notifyUrl: process.env.appotaIPNUrl,
        redirectUrl: process.env.appotaReturnUrl,
        signature: hmac,
      };
      const data = await lastValueFrom(
        this.httpService.post(
          this.configService.get('appotaUrl') + '/api/v1/orders/payment/bank',
          body,
          requestConfig,
        ),
      );
      return data.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async returnIPN(req: ReturnIPNDto) {
    // const dataSignature = `amount=${req.amount}&apiKey=${req.apiKey}&appotapayTransId=${req.appotapayTransId}&bankCode=${req.bankCode}&currency=${req.currency}&errorCode=${req.errorCode}&extraData=${req.extraData}&message=${req.message}&orderId=${req.orderId}&partnerCode=${req.partnerCode}&paymentMethod=${req.paymentMethod}&paymentType=${req.paymentType}&transactionTs=${req.transactionTs}`;
    // const hmac = CryptoJS.enc.Hex.stringify(
    //   CryptoJS.HmacSHA256(dataSignature, process.env.appotaSecretKey),
    // );
    // if (hmac === req.signature) {
    //   if (req.errorCode === 0) {
    //     const order = await this.orderTable.findOne(req.orderId, {
    //       relations: ['user'],
    //     });
    //     if (order.status == '0') {
    //       const connection = getConnection();
    //       const queryRunner = connection.createQueryRunner();
    //       await queryRunner.connect();
    //       await queryRunner.startTransaction();
    //       try {
    //         const updateOrder = await this.orderTable.update(order.id, {
    //           status: '1',
    //           transactionTs: req.transactionTs,
    //           appotapayTransId: req.appotapayTransId,
    //           errrorCode: req.errorCode,
    //           extraData: req.extraData,
    //           //  message:req.message
    //         });
    //         const updateMonney = await this.userRepository.update(
    //           order.user.id,
    //           {
    //             money: order.user.money + req.amount,
    //           },
    //         );
    //         await queryRunner.manager.save(updateOrder);
    //         await queryRunner.manager.save(updateMonney);
    //         await queryRunner.commitTransaction();
    //         return { status: 'ok' };
    //       } catch (error) {
    //         console.log(error);
    //         await queryRunner.rollbackTransaction();
    //       } finally {
    //         await queryRunner.release();
    //       }
    //     } else {
    //       throw new BadRequestException(500, `Da duoc update`);
    //     }
    //   }
    //   throw new BadRequestException(500, `Thanh toan that bai`);
    // } else {
    //   throw new BadRequestException(500, `Sai Chu Ky`);
    // }
  }

  async historyCharge(id) {
    const charge = await this.orderTable.findOne({
      // relations: ['user'],
      // where: { id, user: { id: userId } },
      where: {
        id,
      },
    });
    if (charge) {
      return {
        money: charge.money,
        status: charge.status,
        appotapayTransId: charge.appotapayTransId,
        transactionTs: charge.transactionTs,
        createdAt: charge.createdAt,
        extraData: charge.extraData,
        errorCode: charge.errrorCode,
      };
    }
    return {};
  }
  returnUrl(query) {
    try {
      return query;
      // var vnp_Params = req.query;
      // var secureHash = vnp_Params['vnp_SecureHash'];

      // delete vnp_Params['vnp_SecureHash'];
      // delete vnp_Params['vnp_SecureHashType'];

      // vnp_Params = this.sortObject(vnp_Params);

      // var tmnCode = process.env.vnp_TmnCode;
      // var secretKey = process.env.vnp_HashSecret;

      // var querystring = require('qs');
      // var signData =
      //   secretKey + querystring.stringify(vnp_Params, { encode: false });

      // var sha256 = require('sha256');

      // var checkSum = sha256(signData);
      // console.log(vnp_Params);

      // if (secureHash === checkSum) {
      //   if (vnp_Params.vnp_ResponseCode === '00') {
      //     return res.redirect(
      //       `https://thegioifitness.com/payment/success/index?amount=${vnp_Params['vnp_Amount']}&&vnp_TxnRef=${vnp_Params['vnp_TxnRef']}&&vnp_TransactionNo=${vnp_Params['vnp_TransactionNo']}&&vnp_ResponseCode=${vnp_Params['vnp_ResponseCode']}&&vnp_PayDate=${vnp_Params['vnp_PayDate']}`,
      //     );
      //   } else {
      //     return res.redirect(
      //       `https://thegioifitness.com/payment/fail/index?amount=${vnp_Params['vnp_Amount']}&&vnp_TxnRef=${vnp_Params['vnp_TxnRef']}&&vnp_TransactionNo=${vnp_Params['vnp_TransactionNo']}&&vnp_ResponseCode=${vnp_Params['vnp_ResponseCode']}&&vnp_PayDate=${vnp_Params['vnp_PayDate']}`,
      //     );
      //   }

      //   //res.sendFile(path.join(__dirname, "../view", "success.html"));
      //   // res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
      // } else {
      //   res.redirect(
      //     `https://thegioifitness.com/payment/fail/index?amount=${vnp_Params['vnp_Amount']}&&vnp_TxnRef=${vnp_Params['vnp_TxnRef']}&&vnp_TransactionNo=${vnp_Params['vnp_TransactionNo']}&&vnp_ResponseCode=${vnp_Params['vnp_ResponseCode']}&&vnp_PayDate=${vnp_Params['vnp_PayDate']}`,
      //   );
      //   // res.sendFile(path.join(__dirname, "../view", "fail.html"));
      //   // res.render("success", { code: "97" });
      // }
    } catch (error) {
      throw new HttpException('Something wrong`', 500);
    }
  }

  sortObject(o) {
    const sorted = {};
    let key;
    const a = [];

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
    }
    return sorted;
  }
  removeAccents(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  async paymentOrder(createVnpayDto: CreatePaymentDto) {
    // const token = await this.jwtService.signAsync(
    //   {
    //     iss: process.env.appotaPartnerCode,
    //     jti: process.env.appotaApiKey + '-' + new Date().getTime(),
    //     api_key: process.env.appotaApiKey,
    //   },
    //   {
    //     expiresIn: '10m',
    //     header: {
    //       alg: 'HS256',
    //       typ: 'JWT',
    //       cty: 'appotapay-api;v=1',
    //     },
    //     secret: process.env.appotaSecretKey,
    //   },
    // );
    // const order = await this.orderTable.create({
    //   order: createVnpayDto.orderId,
    //   money: createVnpayDto.amount,
    //   status: PaymentStatus.CREATE,
    // });
    // await this.orderTable.save(order);
    // const dataSignature = `amount=${createVnpayDto.amount}&bankCode=&clientIp=${process.env.ip}&extraData=${createVnpayDto.orderId}&notifyUrl=${process.env.appotaIPNOrderUrl}&orderId=${order.id}&orderInfo=${createVnpayDto.orderId}&paymentMethod=&redirectUrl=${process.env.appotaReturnUrl}`;
    // const hmac = CryptoJS.enc.Hex.stringify(
    //   CryptoJS.HmacSHA256(dataSignature, process.env.appotaSecretKey),
    // );
    // const requestConfig: AxiosRequestConfig = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-APPOTAPAY-AUTH': `Bearer ${token}`,
    //   },
    // };
    // try {
    //   const body = {
    //     amount: createVnpayDto.amount,
    //     orderId: order.id,
    //     orderInfo: `${createVnpayDto.orderId}`,
    //     bankCode: '',
    //     paymentMethod: '',
    //     clientIp: process.env.ip,
    //     extraData: createVnpayDto.orderId,
    //     notifyUrl: process.env.appotaIPNOrderUrl,
    //     redirectUrl: process.env.appotaReturnUrl,
    //     signature: hmac,
    //   };
    //   const data = await lastValueFrom(
    //     this.httpService.post(
    //       this.configService.get('appotaUrl') + '/api/v1/orders/payment/bank',
    //       body,
    //       requestConfig,
    //     ),
    //   );
    //   return data.data;
    // } catch (error) {
    //   throw new HttpException(error.response.data, error.response.status);
    // }
  }

  async returnIPNOrder(req: ReturnIPNDto) {
    // console.log(req);
    // const dataSignature = `amount=${req.amount}&apiKey=${req.apiKey}&appotapayTransId=${req.appotapayTransId}&bankCode=${req.bankCode}&currency=${req.currency}&errorCode=${req.errorCode}&extraData=${req.extraData}&message=${req.message}&orderId=${req.orderId}&partnerCode=${req.partnerCode}&paymentMethod=${req.paymentMethod}&paymentType=${req.paymentType}&transactionTs=${req.transactionTs}`;
    // const hmac = CryptoJS.enc.Hex.stringify(
    //   CryptoJS.HmacSHA256(dataSignature, process.env.appotaSecretKey),
    // );
    // if (hmac === req.signature) {
    //   if (req.errorCode === 0) {
    //     const order = await this.orderTable.findOne(req.orderId);
    //     if (order.status == '0') {
    //       const connection = getConnection();
    //       const queryRunner = connection.createQueryRunner();
    //       await queryRunner.connect();
    //       await queryRunner.startTransaction();
    //       try {
    //         const updateOrder = await this.orderTable.update(order.id, {
    //           status: '1',
    //           transactionTs: req.transactionTs,
    //           appotapayTransId: req.appotapayTransId,
    //           errrorCode: req.errorCode,
    //           extraData: req.extraData,
    //           //message:req.message
    //         });
    //         const updateMonney = await this.orderTableResponse.update(
    //           { id: order.order },
    //           {
    //             status: OrderStatus.PayMent_Success,
    //           },
    //         );
    //         await queryRunner.manager.save(updateOrder);
    //         await queryRunner.manager.save(updateMonney);
    //         await queryRunner.commitTransaction();
    //         return { status: 'ok' };
    //       } catch (error) {
    //         console.log(error);
    //         await queryRunner.rollbackTransaction();
    //       } finally {
    //         await queryRunner.release();
    //       }
    //     } else {
    //       throw new BadRequestException(500, `Da duoc update`);
    //     }
    //   }
    //   throw new BadRequestException(500, `Thanh toan that bai`);
    // } else {
    //   throw new BadRequestException(500, `Sai Chu Ky`);
    // }
  }
}
