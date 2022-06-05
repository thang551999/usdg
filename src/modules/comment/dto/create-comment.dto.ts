import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Place } from '../../place/entities/place.entity';
export class CreateCommentDto {
  @ApiProperty()
  @IsNumber()
  star: number;

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  commentImages: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  commentVideos: string[];

  @ApiProperty()
  @IsNotEmpty()
  place: Place;
}
