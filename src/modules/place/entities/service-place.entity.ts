import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'service-place' })
export class ServicePlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  lastPrice: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ default: false })
  isDelete: boolean;

  @ManyToOne(() => Place, (place) => place.services)
  place: Place;
}
