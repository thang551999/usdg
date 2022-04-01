import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'send_sms' })
export class SendSmsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  phone: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  code: string;

  @ApiProperty()
  @Column('boolean', { default: false })
  actived: boolean;

  @ApiProperty()
  @Column({ length: 50, default: 'register' })
  type: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
