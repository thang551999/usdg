import { IsNumber, IsString } from 'class-validator';
export class SystemConfigDto {
  @IsString()
  gasFee: string;

  @IsNumber()
  dateRefundMoney: number;
}
