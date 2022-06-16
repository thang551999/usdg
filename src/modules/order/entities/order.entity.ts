import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORDER_STATUS } from '../../../common/constant';
import { Place } from '../../place/entities/place.entity';
import { Customer } from '../../users/entities/customer.entity';
import { VoucherOrder } from '../../voucher/entities/voucher_order.entity';
import { HistoryBlockBooking } from './history-block-booking.entity';
import { HistoryService } from './history-service.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  money: string;

  @Column()
  type: number;

  @Column({ length: 10 })
  phoneNumber: string;

  @Column({ default: ORDER_STATUS.WAIT_CONFIRM })
  status: number;

  @Column()
  dayOrder: Date;

  @Column()
  timeStart: string;

  @OneToMany(
    () => HistoryBlockBooking,
    (historyBlockBooking) => historyBlockBooking.order,
    { cascade: true },
  )
  timeBlocks: HistoryBlockBooking[];

  @OneToMany(() => HistoryService, (historyService) => historyService.order, {
    cascade: true,
  })
  historyServices: HistoryService[];

  @OneToMany(() => VoucherOrder, (voucherOrder) => voucherOrder.order)
  voucherOrder: VoucherOrder[];

  //many to one use
  @ManyToOne(() => Customer, (customer) => customer.order)
  customer: Customer;

  // many to place
  @ManyToOne(() => Place, (place) => place.order)
  place: Place;
}
