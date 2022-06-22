import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Voucher } from './voucher.entity';
import { Order } from '../../order/entities/order.entity';

@Entity({ name: 'voucher_order' })
export class VoucherOrder {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  value: string;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Voucher, (voucher) => voucher.voucherOrder)
  voucher: Voucher;

  @ManyToOne(() => Order, (order) => order.voucherOrder)
  order: Order;
}
