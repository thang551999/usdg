import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Voucher } from './voucher.entity';

@Entity({ name: 'voucher-history' })
export class VoucherHistory {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  value: string;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Voucher, (voucher) => voucher.voucherHistory)
  voucher: Voucher;
}
