import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORDER_STATUS } from '../../../common/constant';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  price: number;

  @Column({ default: ORDER_STATUS.WAIT_CONFIRM })
  status: number;

  @Column()
  dayorder: Date;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  //many to one use

  // many to place

  // many to many voucher
}
