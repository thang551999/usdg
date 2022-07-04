import { Module } from '@nestjs/common';
import { UsdgService } from './usdg.service';
import { UsdgController } from './usdg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usdg } from './entities/usdg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usdg])],
  controllers: [UsdgController],
  providers: [UsdgService],
})
export class UsdgModule {}
