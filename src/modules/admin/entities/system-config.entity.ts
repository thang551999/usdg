import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class SystemConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gasFee: string;
}
