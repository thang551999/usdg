import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoryService {
  @PrimaryGeneratedColumn('uuid')
  is: string;

  //nôi đến service

  // gia tien

  // orderId
}
