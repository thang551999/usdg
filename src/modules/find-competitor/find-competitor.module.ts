import { Module } from '@nestjs/common';
import { FindCompetitorService } from './find-competitor.service';
import { FindCompetitorController } from './find-competitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindCompetitorEntity } from './entities/find-competitor.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FindCompetitorEntity, UserEntity])],
  controllers: [FindCompetitorController],
  providers: [FindCompetitorService],
})
export class FindCompetitorModule {}
