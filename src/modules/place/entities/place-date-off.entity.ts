import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity({ name: 'date-off-place' })
export class DateOff {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  dayOff: string;

  @OneToMany(() => Place, (place) => place.dateOff)
  place: Place[];
}
