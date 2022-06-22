import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import SystemConfigEntity from './entities/system-config.entity';
import { Place } from '../place/entities/place.entity';
import { Order } from '../order/entities/order.entity';
import { Customer } from '../users/entities/customer.entity';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemConfigEntity,
      Place,
      Order,
      Customer,
      OwnerPlace,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
