import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('find-competitor')
export class FindCompetitor {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  iamge: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  phone: string;
}
