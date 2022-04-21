import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'customer' })
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ default: 0 })
  money: number;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn()
  userInfo: UserEntity;
}
