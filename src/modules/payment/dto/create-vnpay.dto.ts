import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

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
}
