import { IsString } from 'class-validator';

export class CreateUsdgDto {
  @IsString()
  APY: string;

  @IsString()
  fee: string;

  @IsString()
  time: string;
}

export class ClaimDto {
  @IsString()
  account: string;

  @IsString()
  amount: string;
}
