import { IsOptional, IsString, IsNumber } from 'class-validator';

export class GetRevenueParams {
  @IsString()
  dateStart: string;

  @IsString()
  dateEnd: string;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  pageSize: number;
}
