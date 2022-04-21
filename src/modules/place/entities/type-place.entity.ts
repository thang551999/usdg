import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'type-place' })
export class TypePlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isAllow: boolean;
}
