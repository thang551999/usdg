import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoryBlockBooking {
  @PrimaryGeneratedColumn('uuid')
  is: string;
}
