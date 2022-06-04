import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../place/entities/place.entity';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
import { Voucher } from './entities/voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, OwnerPlace, Voucher])],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
