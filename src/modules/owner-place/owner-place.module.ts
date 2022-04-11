import { Module } from '@nestjs/common';
import { OwnerPlaceService } from './owner-place.service';
import { OwnerPlaceController } from './owner-place.controller';

@Module({
  controllers: [OwnerPlaceController],
  providers: [OwnerPlaceService]
})
export class OwnerPlaceModule {}
