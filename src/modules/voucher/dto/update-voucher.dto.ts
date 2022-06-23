import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { TypeVoucher } from '../../../common/constant';
import { IsDateStringFormat } from '../../../common/validate.decorator';
import { Place } from '../../place/entities/place.entity';
export class UpdateVoucherDto {
  @ApiProperty({ required: true, example: '1000' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]*$/, {
    message: 'Giá phải chứ ký tự 0-9',
  })
  maxMoneySale: string;

  @ApiProperty({ required: true, example: '1000' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]*$/, {
    message: 'Giá phải chứ ký tự 0-9',
  })
  moneyCondition: string;

  @ApiProperty({ required: true, example: '1000' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: '1000' })
  @IsString()
  value: string;

  @ApiProperty({ required: true, enum: TypeVoucher })
  @IsEnum(TypeVoucher)
  type: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  isActive: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2022/06/30',
    description: 'Format:YYYY/MM/DD',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsDateStringFormat('YYYY/MM/DD', true)
  endDate: string;

  @ApiProperty({ required: true, example: {} })
  @IsNotEmpty()
  place: Place;
}
