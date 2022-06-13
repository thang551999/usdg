import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({ required: false, example: '011' })
  @IsOptional()
  @IsString()
  cityCode: string;

  @ApiProperty({ required: false, example: '011' })
  @IsOptional()
  @IsString()
  districtCode: string;
}
