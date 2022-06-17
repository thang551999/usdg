import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class GetOwnerParams {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  pageSize: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  page: number;
}
