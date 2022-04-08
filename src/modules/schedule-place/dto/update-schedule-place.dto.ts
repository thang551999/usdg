import { PartialType } from '@nestjs/swagger';
import { CreateSchedulePlaceDto } from './create-schedule-place.dto';

export class UpdateSchedulePlaceDto extends PartialType(CreateSchedulePlaceDto) {}
