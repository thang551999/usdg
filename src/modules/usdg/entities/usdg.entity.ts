import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usdg' })
export class Usdg {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ nullable: true, default: '1' })
  public currenIndex: string;

  @Column({ nullable: true, default: '0' })
  public APY: string;
}
