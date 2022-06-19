import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../../place/entities/place.entity';
import { Order } from './order.entity';

@Entity()
export class HistoryBlockBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timeStart: string;

  @Column()
  dayOrder: string;

  @ManyToOne(() => Order, (order) => order.timeBlocks)
  order: Order;

  @Column({ default: '0' })
  price: string;

  @ManyToOne(() => Place, (place) => place.timeBooking)
  place: Place;
}
