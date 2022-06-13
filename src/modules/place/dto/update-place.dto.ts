import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Place } from '../entities/place.entity';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
export class UpdateTimeGold {
  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  price: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  lastPrice: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  timeStart: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  place: Place;
}

export class UpdateService {
  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  price: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  lastPrice: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  place: Place;
}
