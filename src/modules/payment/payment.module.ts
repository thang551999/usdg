import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppotaService } from './appota.service';
import { AppotaController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderVnPay from './entities/history-appota.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderVnPay, UserEntity, Order]),
    HttpModule,
  ],
  controllers: [AppotaController],
  providers: [AppotaService, ConfigService, JwtStrategy],
})
export class PaymentModule {}
