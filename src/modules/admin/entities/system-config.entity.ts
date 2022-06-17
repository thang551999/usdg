import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class SystemConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gasFee: string;

  @Column()
  dateRefundMoney: number;
}
