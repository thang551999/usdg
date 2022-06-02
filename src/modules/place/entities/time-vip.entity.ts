import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'time-gold' })
export class TimeGold {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  timeStart: string;

  @Column()
  timeEnd: string;

  @Column()
  price: string;

  @ManyToOne(() => Place, (place) => place.timeGold)
  place: Place;
}
