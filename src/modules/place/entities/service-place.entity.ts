import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BackUpPlace } from './place.entity';

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

  @ManyToOne(() => BackUpPlace, (place) => place.services)
  place: BackUpPlace;
}
