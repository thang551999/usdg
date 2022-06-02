import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OwnerPlace } from '../../owner-place/entities/owner-place.entity';
import { Place } from '../../place/entities/place.entity';
import { VoucherOrder } from './voucher_order.entity';

@Entity({ name: 'voucher' })
export class Voucher {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  amount: number;

  @Column()
  type: number;

  @Column({ default: 1 })
  isActive: number;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  maxMoneySale: string;

  @Column()
  moneyCondition: string;

  @ManyToOne(() => OwnerPlace, (owner) => owner.voucherCreate)
  owner: OwnerPlace;

  @ManyToOne(() => Place, (place) => place.voucherCreate)
  place: Place;

  @OneToMany(() => VoucherOrder, (voucherOrder) => voucherOrder.voucher)
  voucherOrder: VoucherOrder[];
}
