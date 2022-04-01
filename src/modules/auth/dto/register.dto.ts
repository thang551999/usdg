import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";
import { UserEntity } from "src/modules/users/entities/user.entity";

export class RegisterUserDto {
    @ApiProperty({example:'hello'})
    @IsString()
    password:string ;

    @ApiProperty({example:'hello'})
    @Length(10)
    @IsString()
    phone:string ;

    @ApiProperty({example:'hello'})
    @IsString()
    code:string ;

    @ApiProperty({example:'HELLO-123',description:"mã mời"})
    @IsString()
    inviteCode:string ;
}
export class ResRegisterDto {
    @ApiProperty({example:"Thành Công"})
    message:string ;
}
export class ResUserInfoDto extends PickType(UserEntity,['id','avatar','email','fullName','phone','role','userInviteId','money','address','referralCode','role']) {}