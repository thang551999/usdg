import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  isActive: number;
}
