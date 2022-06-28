import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CreateFindCompetitorDto } from './dto/create-find-competitor.dto';
import { UpdateFindCompetitorDto } from './dto/update-find-competitor.dto';
import { FindCompetitorEntity } from './entities/find-competitor.entity';

@Injectable()
export class FindCompetitorService {
  constructor(
    @InjectRepository(FindCompetitorEntity)
    private findCompetitorRepository: Repository<FindCompetitorEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createFindCompetitorDto: CreateFindCompetitorDto, userToken) {
    const user = await this.userRepository.findOne({
      where: { id: userToken.id },
    });
    const findCompertitor = await this.findCompetitorRepository.create({
      ...createFindCompetitorDto,
      user,
    });
    await this.findCompetitorRepository.save(findCompertitor);
    return findCompertitor;
  }

  async findAll(getParams) {
    const findCompetitor = await this.findCompetitorRepository.findAndCount({
      relations: ['user'],
      skip: (getParams.page - 1) * getParams.pageSize,
      take: getParams.pageSize,
    });
    return {
      total: findCompetitor[1],
      pageSize: getParams.pageSize,
      currentPage: getParams.page,
      records: findCompetitor[0],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} findCompetitor`;
  }

  update(id: number, updateFindCompetitorDto: UpdateFindCompetitorDto) {
    return `This action updates a #${id} findCompetitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} findCompetitor`;
  }
}
