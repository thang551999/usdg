import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../users/entities/customer.entity';

@Entity({ name: 'history-transaction-appota' })
class HistoryAppotaTransaction {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Customer, (user) => user.historyChargeMoney)
  user: Customer;

  @Column({ nullable: true })
  public money: number;

  @Column('text', { nullable: true })
  public status: string;

  @Column('text', { nullable: true })
  public order: string;

  @Column('text', { nullable: true })
  public message: string;

  @Column('text', { nullable: true })
  public extraData: string;

  @Column('text', { nullable: true })
  public appotapayTransId: string;

  @Column('text', { nullable: true })
  public transactionTs: number;

  @Column('text', { nullable: true })
  public errrorCode: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}

export default HistoryAppotaTransaction;
