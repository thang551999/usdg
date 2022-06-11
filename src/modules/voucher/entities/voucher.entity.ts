import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OwnerPlace } from '../../owner-place/entities/owner-place.entity';
import { Place } from '../../place/entities/place.entity';
import { VoucherHistory } from './voucher-history.entity';
import { VoucherOrder } from './voucher_order.entity';

@Entity({ name: 'voucher' })
export class Voucher {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  amount: number;

  @Column()
  name: string;

  @Column()
  type: number;

  @Column({ default: false })
  isAdminCreate: boolean;

  @Column({ default: 1 })
  isActive: number;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  maxMoneySale: string;

  @Column({ nullable: true })
  moneyCondition: string;

  @ManyToOne(() => OwnerPlace, (owner) => owner.voucherCreate)
  owner: OwnerPlace;

  @ManyToOne(() => Place, (place) => place.voucherCreate)
  place: Place;

  @OneToMany(() => VoucherOrder, (voucherOrder) => voucherOrder.voucher)
  voucherOrder: VoucherOrder[];

  @OneToMany(() => VoucherHistory, (voucherHistory) => voucherHistory.voucher)
  voucherHistory: VoucherHistory[];
}
