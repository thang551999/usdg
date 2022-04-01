import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class AdminAddMoneyUserDto {
    @ApiProperty({example:100})
    @IsInt()
    money:number ;
}