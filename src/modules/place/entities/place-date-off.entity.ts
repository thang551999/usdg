import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'date-off-place' })
export class DateOff {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  dayOff: string;

  @Column()
  reason: string;

  @ManyToOne(() => Place, (place) => place.dateOff)
  place: Place;
}
