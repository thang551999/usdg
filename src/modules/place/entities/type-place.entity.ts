import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'type-place' })
export class TypePlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isAllow: boolean;

  @OneToMany(() => Place, (place) => place.typePlace)
  place: Place[];
}
