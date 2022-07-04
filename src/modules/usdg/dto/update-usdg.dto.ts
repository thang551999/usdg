import { PartialType } from '@nestjs/swagger';
import { CreateUsdgDto } from './create-usdg.dto';

export class UpdateUsdgDto extends PartialType(CreateUsdgDto) {}
