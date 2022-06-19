import { IsString, Length, IsNumber } from 'class-validator';

export class CreateFindCompetitorDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsString()
  @Length(10)
  phone: string;
}

export class GetParamsFindCompetitor {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
