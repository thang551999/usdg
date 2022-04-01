import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional } from "class-validator"

export class HistoryCharge {
  @ApiProperty({ example: '0922255199' })
  @IsOptional()
  @IsInt()
  pageSize:number

  @ApiProperty({ example: '0922255199' })
  @IsOptional()
  @IsInt()
  pageNumber:number
}