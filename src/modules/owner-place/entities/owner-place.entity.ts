import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BackUpPlace } from '../../place/entities/place.entity';

@Entity('owner-place')
export class OwnerPlace {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  address: string;

  // @Column()
  // start: string;

  @Column({ default: false })
  active: boolean;

  @Column()
  phone: string;

  @OneToOne(() => UserEntity, (user) => user.ownerPlace)
  userInfo: UserEntity;

  @OneToMany(() => BackUpPlace, (place) => place.owner)
  places: BackUpPlace[];
}
