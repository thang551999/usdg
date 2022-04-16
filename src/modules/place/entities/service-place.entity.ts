import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'service-place' })
export class ServicePlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column({ default: false })
  isDelete: boolean;
}
