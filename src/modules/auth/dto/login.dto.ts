import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: '0973551247' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'khanh' })
  @IsString()
  password: string;
}
export class ResLoginUserDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhNTgyZmIwLTMwMWUtNGY2Ni04YTg0LTJiMDVkZWU0NDEwNyIsInJvbGUiOjEsInVzZXJUeXBlIjoxLCJpYXQiOjE2Mjk1NDA5MzB9.jTEl2zt9x_g78xnD-r4yzHGLSClLLpiTS2Z_4opONiA',
  })
  token: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhNTgyZmIwLTMwMWUtNGY2Ni04YTg0LTJiMDVkZWU0NDEwNyIsInJvbGUiOjEsInVzZXJUeXBlIjoxLCJpYXQiOjE2Mjk1NDA5MzB9.jTEl2zt9x_g78xnD-r4yzHGLSClLLpiTS2Z_4opONiA',
  })
  refreshToken: string;

  @ApiProperty({ example: '1a582fb0-301e-4f66-8a84-2b05dee44107' })
  id: string;

  @ApiProperty({ example: 'phong' })
  fullName: string;

  @ApiProperty({ example: 'phong' })
  avatar: string;

  @ApiProperty({ example: 'phong@gmail.com' })
  email: string;

  @ApiProperty({ example: 1 })
  role: number;
}

export class ActiveEmail {
  @IsString()
  token: string;
}
