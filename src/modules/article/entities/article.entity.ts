import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ArticleTypeEntity } from './article.type.entity';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: null })
  description: string;

  @Column({ default: 1 })
  isActive: number;

  @Column({ default: '0' })
  numbersRead: string;

  @ManyToOne(() => UserEntity, (user) => user.article)
  user: UserEntity;

  @ManyToOne(
    () => ArticleTypeEntity,
    (articleTypeEntity) => articleTypeEntity.article,
    { eager: true },
  )
  typeArticle: ArticleTypeEntity;
}
