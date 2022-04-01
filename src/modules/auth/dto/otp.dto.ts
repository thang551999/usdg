import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
const typeOtp ={
  forgotPassword:'forgotPassword',
  register:'register'
}

export class OTPDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({ example: 'hello' })
  @IsEnum(typeOtp)
  type: string;
}
