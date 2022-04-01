import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: '0922255199' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '0000' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'hello' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
export class ResForgotPasswordDto {
  @ApiProperty()
  message: string;
}
