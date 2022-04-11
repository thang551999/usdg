import { PartialType } from '@nestjs/swagger';
import { CreateOwnerPlaceDto } from './create-owner-place.dto';

export class UpdateOwnerPlaceDto extends PartialType(CreateOwnerPlaceDto) {}
