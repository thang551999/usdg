import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class ChangePasswordUserDto {
    @ApiProperty({example:'hello'})
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password:string ;

    @ApiProperty({example:'hello'})
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    newPassword:string
}
export class ResChangePasswordUserDto {
    @ApiProperty({example:"Đổi Mật Khẩu Thành Công"})
    message:string ;
}