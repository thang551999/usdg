import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';
import { TypeOrder } from '../../../common/constant';
import { IsDateStringFormat } from '../../../common/validate.decorator';
import { Place } from '../../place/entities/place.entity';

export class CreateOrderDto {
  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsString()
  @MaxLength(10)
  phoneNumber: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  place: Place;

  @ApiProperty({
    example: '03/09/2022 11:00:00',
    description: 'Format: MM/DD/YYYY HH:mm:ss',
    required: false,
  })
  @IsString()
  timeStart: string;

  @ApiProperty({
    example: '03/09/2022 11:00:00',
    description: 'Format: MM/DD/YYYY HH:mm:ss',
    required: false,
  })
  @IsString()
  orderDay: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  voucher: [];

  @IsArray()
  timeBooks: string[];

  @IsArray()
  services: string[];
}
