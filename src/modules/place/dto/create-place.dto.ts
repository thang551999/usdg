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
    message: 'F-NFT number must be number',
  })
  priceMin: string;

  @ApiProperty()
  @IsArray()
  imageBanner;

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
