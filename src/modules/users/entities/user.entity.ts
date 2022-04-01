import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ERoleUser } from '../user.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  password: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  fullName: string;

  @ApiProperty()
  @Column({
    length: 100,
    default:
      'https://res.cloudinary.com/dzbytteef/image/upload/v1632899978/default-user_ron9tg.png',
  })
  avatar: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  phone: string;

  @ApiProperty()
  @Column({ default: 1 })
  rank: number;

  @ApiProperty()
  @Column({ length: 20, name: 'referral_code' })
  referralCode: string;

  @ApiProperty()
  @Column('enum', { default: 1, enum: ERoleUser })
  role: number;

  @ApiProperty()
  @Column('int', { default: 0 })
  money: number;

  @ApiProperty()
  @Column('int', { default: 1, name: 'user_type' })
  userType: number;

  @ApiProperty()
  @Column('boolean', { default: false })
  actived: boolean;

  @ApiProperty({ description: 'số point', example: 10 })
  @Column('int', { default: 0 })
  point: number;

  @ApiProperty({ description: 'số point', example: 10 })
  @Column('int', { default: 0, name: 'total_point' })
  totalPoint: number;

  @ApiProperty()
  @Column('boolean', { default: false })
  updatedInfo: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  birthday: Date;

  @ApiProperty()
  @Column('uuid', { name: 'user_invite', nullable: true })
  userInviteId: string;

  @ApiProperty()
  @Column('simple-array', { name: 'token_devices', nullable: true })
  tokenDevices: string[];

  @ApiProperty()
  @Column({ length: 50, nullable: true, name: 'code_forgot_password' })
  codeForgotPassword: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true, name: 'token_forgot_password' })
  tokenForgotPassword: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true })
  city: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true })
  district: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true })
  backIdCard: string;

  @ApiProperty()
  @Column('int', { default: 0 })
  score: number;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true })
  frontIdCard: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
