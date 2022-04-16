import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  start: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createAt: Date;

  @Column({ default: false })
  isDisable: boolean;

  // many to one user
  // many to one place
}
