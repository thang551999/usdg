import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ConfirmRegisterdDto {
  @ApiProperty({
    example: '092255199',
  })
  @IsString()
  @MinLength(10)
  phone: string;

  @ApiProperty({ example: '6663' })
  @IsString()
  @Length(4)
  code: string;
}
export class ResConfirmRegisterDto {
  @ApiProperty()
  message: string;
}
