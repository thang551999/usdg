import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'service-place' })
export class ServicePlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column({ default: false })
  isDelete: boolean;

  @ManyToOne(() => Place, (place) => place.services)
  place: Place;
}
