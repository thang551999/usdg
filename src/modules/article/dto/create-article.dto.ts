import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { ArticleTypeEntity } from '../entities/article.type.entity';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  content: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  typeArticle: ArticleTypeEntity;
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
