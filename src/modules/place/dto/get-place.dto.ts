import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, MIN } from 'class-validator';

export class GetPlaceParams {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  pageSize: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  page: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  limitUser: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  typePlace: string;
}
