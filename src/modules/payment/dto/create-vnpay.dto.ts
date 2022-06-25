import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, isString, IsString } from 'class-validator';

export class CreateAppotaDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsInt()
  amount: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  @IsString()
  bankCode: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  extraData: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  paymentMethod: string;
}
export class CreateVnpay {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  amount: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  @IsString()
  bankCode: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  orderType: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  orderDescription;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  language;
}
export class CreatePaymentDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  orderId: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsInt()
  amount: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  @IsString()
  bankCode: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  extraData: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsOptional()
  paymentMethod: string;
}

export class GetParams {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;

  @ApiProperty({
    example: '2022/03/10',
    description: 'Format: YYYY/MM/DD',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateStart: string;

  @ApiProperty({
    example: '2022/03/10',
    description: 'Format: YYYY/MM/DD',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateEnd: string;
}
