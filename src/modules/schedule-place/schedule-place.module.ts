import { Module } from '@nestjs/common';
import { SchedulePlaceService } from './schedule-place.service';
import { SchedulePlaceController } from './schedule-place.controller';

@Module({
  controllers: [SchedulePlaceController],
  providers: [SchedulePlaceService]
})
export class SchedulePlaceModule {}
