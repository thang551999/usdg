import { IsNumber } from 'class-validator';

export class CreateArticleDto {}

export class GetArticleParams {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
