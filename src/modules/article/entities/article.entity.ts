import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ArticleTypeEntity } from './article.type.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  tag: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: '0' })
  numbersRead: string;

  @ManyToOne(() => UserEntity, (user) => user.article)
  user: UserEntity;

  @ManyToOne(
    () => ArticleTypeEntity,
    (articleTypeEntity) => articleTypeEntity.article,
  )
  typeArticle: ArticleTypeEntity;
}
