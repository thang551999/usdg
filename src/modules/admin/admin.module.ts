import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import SystemConfigEntity from './entities/system-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfigEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
