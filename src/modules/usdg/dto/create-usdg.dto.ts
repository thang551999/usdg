import { IsString } from 'class-validator';

export class CreateUsdgDto {
  @IsString()
  APY: string;
}
