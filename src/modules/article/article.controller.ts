import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, GetArticleParams } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { API_SUCCESS } from '../../common/constant';
import { JwtAuthGuard, JwtStrategy } from '../auth/jwt.strategy';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UserInfo() user: IUserInfo,
  ) {
    return this.articleService.create(createArticleDto, user);
  }

  @Get()
  async findAll(@Query() getParams: GetArticleParams) {
    const res = this.articleService.findAll(getParams);
    return {
      code: API_SUCCESS,
      data: res,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
