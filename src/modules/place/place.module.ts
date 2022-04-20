import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { OwnerPlace } from '../owner-place/entities/owner-place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, OwnerPlace])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
