import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  price: number;

  @Column()
  status: Date;

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
