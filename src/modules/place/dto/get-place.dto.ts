import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, MIN } from 'class-validator';

export class GetPlaceParams {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  pageSize: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  page: number;
}
