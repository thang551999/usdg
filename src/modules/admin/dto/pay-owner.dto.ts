import { IsUUID, IsString } from 'class-validator';

export class PayOwner {
  @IsUUID()
  id: string;

  @IsString()
  amount: string;
}
