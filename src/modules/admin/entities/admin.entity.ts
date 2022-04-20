import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'admin' })
export class Admin {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => UserEntity, (user) => user.admin)
  @JoinColumn()
  userInfo: UserEntity;
}
