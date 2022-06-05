import { Customer } from '../../users/entities/customer.entity';
import { Place } from '../../place/entities/place.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  star: number;

  @Column()
  comment: string;

  @Column({ type: 'simple-array', nullable: true })
  commentImages: string[];

  @Column({ type: 'simple-array', nullable: true })
  commentVideos: string[];

  @CreateDateColumn()
  createAt: Date;

  @Column({ default: false })
  isDisable: boolean;

  @ManyToOne(() => Place, (place) => place.comments)
  place: Place;

  @ManyToOne(() => Customer, (customer) => customer.comments)
  customer: Customer;

  // many to one user
  // many to one place
}
