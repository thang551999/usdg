import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppotaService } from './appota.service';
import { AppotaController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Order } from '../order/entities/order.entity';
import { Customer } from '../users/entities/customer.entity';
import VnpayHistory from './entities/vnpay-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Order, Customer, VnpayHistory]),
    HttpModule,
  ],
  controllers: [AppotaController],
  providers: [AppotaService, ConfigService, JwtStrategy],
})
export class PaymentModule {}
