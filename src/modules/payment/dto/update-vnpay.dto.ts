import { PartialType } from '@nestjs/swagger';
import { CreateAppotaDto } from './create-vnpay.dto';

export class UpdateAppotaDto extends PartialType(CreateAppotaDto) {}
