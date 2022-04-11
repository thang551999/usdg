import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('owner-place')
export class OwnerPlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  address: string;

  @Column()
  start: string;

  @OneToOne(() => UserEntity, (user) => user.ownerPlace)
  userInfo: UserEntity;
}
