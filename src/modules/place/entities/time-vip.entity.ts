import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'time-gold' })
export class TimeGold {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @Column()
  price: number;
}
