import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ArticleEntity } from './article.entity';

@Entity('article')
export class ArticleTypeEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => ArticleEntity, (articleEntity) => articleEntity.typeArticle)
  article: ArticleEntity[];
}
