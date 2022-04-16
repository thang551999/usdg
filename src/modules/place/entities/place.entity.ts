import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'place' })
export class Place {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  address: string;

  @Column()
  timeOpen: Date;

  @Column()
  price: number;

  @Column()
  timeClose: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  timeDistance: number;

  //one to many bang time vip

  //one to many dich vu

  //one to many comment place

  // one to many voucher

  //one to many order
}
