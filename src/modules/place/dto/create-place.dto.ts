import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

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
  timeClose: string;

  @ApiProperty({ required: true, example: 300 })
  @IsNotEmpty()
  @IsInt()
  timeDistance: number;

  @ApiProperty({ required: true, example: 1000 })
  @IsNotEmpty()
  @IsInt()
  priceMin: number;

  @ApiProperty({ required: true, example: 1000 })
  @IsArray()
  imageBanner;

  @ApiProperty({ required: true, example: 1000 })
  @IsArray()
  imageDetails;

  @ApiProperty({ example: 1000 })
  @IsArray()
  timeGold;

  @ApiProperty({ example: 1000 })
  @IsArray()
  services;

  @ApiProperty({ example: 1000 })
  @IsOptional()
  @IsNumber()
  limitUser;
}
