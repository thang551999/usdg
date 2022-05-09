import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
import { BackUpPlace } from './entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BackUpPlace, OwnerPlace])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
