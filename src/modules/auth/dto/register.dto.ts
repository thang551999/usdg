import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class RegisterUserDto {
  @ApiProperty({ example: 'hello' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'hello' })
  @IsEmail({})
  @IsNotEmpty()
  email: string;
}
export class ResRegisterDto {
  @ApiProperty({ example: 'Thành Công' })
  message: string;
}
export class ResUserInfoDto extends PickType(UserEntity, [
  'id',
  'avatar',
  'email',
  'fullName',
  'phone',
  'role',
  'money',
  'address',
  'role',
]) {}
