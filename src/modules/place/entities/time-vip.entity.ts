import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BackUpPlace } from './place.entity';

@Entity({ name: 'time-gold' })
export class TimeGold {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  timeStart: string;

  @Column()
  timeEnd: string;

  @Column()
  price: number;

  @ManyToOne(() => BackUpPlace, (place) => place.timeGold)
  place: BackUpPlace;
}
