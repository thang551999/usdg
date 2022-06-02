import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReturnIPNDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsInt()
  amount: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsInt()
  errorCode: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  message: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  bankCode: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  extraData: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  paymentMethod: string;

  @IsString()
  partnerCode: string;

  @IsString()
  apiKey: string;

  @IsString()
  currency: string;

  @IsString()
  orderId: string;

  @IsString()
  paymentType: string;

  @IsString()
  appotapayTransId: string;

  @IsInt()
  transactionTs: number;

  @IsString()
  signature: string;
}
