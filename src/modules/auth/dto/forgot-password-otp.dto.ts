import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ConfirmForgotPasswordOTPDto {
  @ApiProperty({
    example:'0000'
  })
  @IsString()
  @Length(4)
  code: string;

  @ApiProperty({
    example:'0922255199'
  })
  @IsString()
  @Length(10)
  phone: string;

}
export class ResConfirmForgotPasswordDto {
  @ApiProperty()
  message: string;
}
