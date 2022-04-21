import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BackUpPlace } from './backup-place.entity';

@Entity({ name: 'time-gold' })
export class TimeGold {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @Column()
  price: number;

  @ManyToOne(() => BackUpPlace, (place) => place.timeGold)
  place: BackUpPlace;
}
