import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column()
  iamge: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  numbersRead: string;
}
