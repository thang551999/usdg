import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { pick } from 'lodash';
import { UserBonus } from './user.constance';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(userId) {
    return this.userRepository.findOne(userId);
  }
  async getUserInfo(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('Người Dùng Không Tồn Tại', HttpStatus.NOT_FOUND);
    }
    return pick(user, [
      'fullName',
      'rank',
      'point',
      'phone',
      'referralCode',
      'avatar',
    ]);
  }
  async getBonusUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException(
        'Người dùng không tồn tại.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
