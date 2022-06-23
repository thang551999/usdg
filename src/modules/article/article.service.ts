import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleTypeEntity } from './entities/article.type.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleTypeEntity)
    private typerArticleRepository: Repository<ArticleTypeEntity>,
  ) {}
  async create(createArticleDto: CreateArticleDto, user) {
    const users = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    const article = await this.articleRepository.create({
      ...createArticleDto,
      user: users,
    });
    await this.articleRepository.save(article);
    return article;
  }

  async findAll(getParams) {
    const article = await this.articleRepository.findAndCount({
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
    });
    return {
      total: article[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: article[0],
    };
  }

  findTypeArticle() {
    return this.typerArticleRepository.findBy({ isActive: 1 });
  }

  findByUser(user) {
    return this.articleRepository.find({
      relations: ['user'],
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async creaetArticle(typeArticle) {
    const typeArticles = await this.typerArticleRepository.create(typeArticle);
    await this.typerArticleRepository.save(typeArticles);
    return typeArticles;
  }
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
