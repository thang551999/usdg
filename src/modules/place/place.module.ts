import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';
import { Place } from './entities/place.entity';
import { TypePlace } from './entities/type-place.entity';
import { AdminPlaceController } from './admin.place.controller';
import { OwnerPlaceController } from './owner.place.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Place, OwnerPlace, TypePlace])],
  controllers: [PlaceController, AdminPlaceController, OwnerPlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
