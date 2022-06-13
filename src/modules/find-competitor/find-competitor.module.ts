import { Module } from '@nestjs/common';
import { FindCompetitorService } from './find-competitor.service';
import { FindCompetitorController } from './find-competitor.controller';

@Module({
  controllers: [FindCompetitorController],
  providers: [FindCompetitorService]
})
export class FindCompetitorModule {}
