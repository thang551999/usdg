import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServicePlace } from '../../place/entities/service-place.entity';
import { Order } from './order.entity';

@Entity()
export class HistoryService {
  @PrimaryGeneratedColumn('uuid')
  is: string;

  @ManyToOne(() => Order, (order) => order.historyServices)
  order: Order;

  @ManyToOne(() => ServicePlace, (service) => service.historyServices)
  servicePlace: ServicePlace;
}
