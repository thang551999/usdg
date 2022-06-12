import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentStatus } from '../../../common/constant';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'vnpay-history' })
class VnpayHistory {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Customer, (user) => user.historyChargeMoney)
  user: Customer;

  @Column({ nullable: true, default: '0' })
  public money: string;

  @Column({ nullable: true, default: PaymentStatus.CREATE })
  public status: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}

export default VnpayHistory;
