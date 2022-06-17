import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../place/entities/place.entity';
import { Order } from './entities/order.entity';
import { Customer } from '../users/entities/customer.entity';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Order, Customer, OwnerPlace])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
