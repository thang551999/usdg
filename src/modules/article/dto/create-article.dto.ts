import { IsNumber, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  content: string;

  @IsArray()
  tags: string[];
}

export class GetArticleParams {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}

export class TypeArticle {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image: string;
}
