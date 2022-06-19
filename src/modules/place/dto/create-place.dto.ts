import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { Place } from '../entities/place.entity';
import { TypePlace } from '../entities/type-place.entity';

export class CreatePlaceDto {
  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ required: true, example: '8h30', description: 'Format 8:30' })
  @IsNotEmpty()
  @IsString()
  timeOpen: string;

  @ApiProperty({ required: true, example: '8h30', description: 'Format 8:30' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: 'Sân bóng bách khoa',
    description: 'Format 8:30',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: '8h30', description: 'Format 8:30' })
  @IsNotEmpty()
  @IsString()
  timeClose: string;

  @ApiProperty({ required: true, example: 300 })
  @IsNotEmpty()
  @IsInt()
  timeDistance: number;

  @ApiProperty({ required: true, example: 1000 })
  @IsNotEmpty()
  @Matches(/^[0-9]*$/, {
    message: 'Giá phải chứ ký tự 0-9',
  })
  priceMin: string;

  // @ApiProperty()
  // @IsArray()
  // imageBanner;

  @ApiProperty()
  @IsArray()
  imageDetails;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  timeGold;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  services;

  @ApiProperty({ example: 1000 })
  @IsOptional()
  @IsNumber()
  limitUsers: number;

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  typePlace: TypePlace;
}

export class TypePlaceDto {
  @ApiProperty({ example: 1000 })
  @IsString()
  name: string;
}

export class CreateServiceDto {
  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  lastPrice: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  place: Place;
}

export class TimeGold {
  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsOptional()
  @IsString()
  lastPrice: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  @IsString()
  timeStart: string;

  @ApiProperty({ required: true, example: 'Lãng Yên hai bà trung' })
  @IsNotEmpty()
  place: Place;
}

export class DayOffDto {
  @IsString()
  dayOff: string;

  @IsString()
  reason: string;

  @IsNotEmpty()
  place: Place;
}

export class DisableTimeDto {
  @IsString()
  timeStart: string;

  @IsString()
  dayOrder: string;

  @IsNotEmpty()
  place: Place;
}
