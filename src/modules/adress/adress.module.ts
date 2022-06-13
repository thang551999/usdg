import { Module } from '@nestjs/common';
import { AddressService } from './adress.service';
import { AddressController } from './adress.controller';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
})
export class AdressModule {}
