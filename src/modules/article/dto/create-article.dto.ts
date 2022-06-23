import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  content: string;
}

export class GetArticleParams {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
