import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'time-gold-place' })
export class TimeGold {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  timeStart: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  lastPrice: string;

  @ManyToOne(() => Place, (place) => place.timeGold)
  place: Place;
}
