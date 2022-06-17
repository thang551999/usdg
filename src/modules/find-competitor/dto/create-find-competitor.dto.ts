import { IsString, Length } from 'class-validator';

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
