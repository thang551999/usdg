import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { Order } from '../../order/entities/order.entity';
import OrderVnPay from '../../payment/entities/history-appota.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'customer' })
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ default: 0 })
  money: number;

  @OneToOne(() => UserEntity, (user) => user.customer, {
    eager: true,
  })
  @JoinColumn()
  userInfo: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.customer)
  comments: Comment[];

  @OneToMany(() => Order, (order) => order.customer)
  order: Order[];

  @OneToMany(() => OrderVnPay, (orderVnpay) => orderVnpay.user)
  historyChargeMoney: OrderVnPay[];
}
