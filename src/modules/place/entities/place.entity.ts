import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OwnerPlace } from '../../owner-place/entities/owner-place.entity';
import { ServicePlace } from './service-place.entity';
import { TimeGold } from './time-vip.entity';
import { TypePlace } from './type-place.entity';

@Entity({ name: 'place' })
export class Place {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ length: 30, name: 'address-place' })
  address: string;

  @Column({ name: 'point', default: 100 })
  point: number;

  @Column({ type: 'simple-array', name: 'imageBanner' })
  imageBanner: string;

  @Column({ type: 'simple-array', name: 'imageDetails' })
  imageDetails: string;

  @Column({ name: 'timeOpen' })
  timeOpen: string;

  @Column({ name: 'priceMin' })
  priceMin: number;

  @Column({ name: 'isEnable', default: true })
  isEnable: boolean;

  @Column({ name: 'timeClose' })
  timeClose: string;

  @Column({ nullable: true })
  limitUser: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  timeDistance: number;

  @ManyToOne(() => OwnerPlace, (ownerPlace) => ownerPlace.places)
  owner: OwnerPlace;

  @ManyToOne(() => TypePlace, (typePlace) => typePlace.place)
  typePlace: TypePlace;
  //one to many bang time vip
  @OneToMany(() => TimeGold, (timeGold) => timeGold.place, {
    cascade: true,
  })
  timeGold: TimeGold[];

  //one to many dich vu
  @OneToMany(() => ServicePlace, (service) => service.place, {
    cascade: true,
  })
  services: ServicePlace[];

  //one to many comment place

  // one to many voucher

  //one to many order
}
