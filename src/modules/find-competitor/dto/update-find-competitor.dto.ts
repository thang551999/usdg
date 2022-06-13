import { PartialType } from '@nestjs/swagger';
import { CreateFindCompetitorDto } from './create-find-competitor.dto';

export class UpdateFindCompetitorDto extends PartialType(CreateFindCompetitorDto) {}
