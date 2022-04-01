import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Phong nguyen', required: false })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsString()
  district: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsString()
  backIdCard: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsString()
  frontIdCard: string;

  @ApiProperty({ example: 'name.jpg', required: false })
  @IsOptional()
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'phong@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email: string;
}
export class ResUpdateUserDto {
  @ApiProperty({ example: 'Cập Nhật Thành Công' })
  message: string;
}
