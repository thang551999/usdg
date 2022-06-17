import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('find-competitor')
export class FindCompetitorEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  phone: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.findCompetitors)
  user: UserEntity;
}
