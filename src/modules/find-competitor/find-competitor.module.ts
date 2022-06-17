import { Module } from '@nestjs/common';
import { FindCompetitorService } from './find-competitor.service';
import { FindCompetitorController } from './find-competitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindCompetitorEntity } from './entities/find-competitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FindCompetitorEntity])],
  controllers: [FindCompetitorController],
  providers: [FindCompetitorService],
})
export class FindCompetitorModule {}
