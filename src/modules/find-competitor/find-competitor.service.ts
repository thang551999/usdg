import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFindCompetitorDto } from './dto/create-find-competitor.dto';
import { UpdateFindCompetitorDto } from './dto/update-find-competitor.dto';
import { FindCompetitorEntity } from './entities/find-competitor.entity';

@Injectable()
export class FindCompetitorService {
  constructor(
    @InjectRepository(FindCompetitorEntity)
    private findCompetitorRepository: Repository<FindCompetitorEntity>,
  ) {}
  async create(createFindCompetitorDto: CreateFindCompetitorDto) {
    const findCompertitor = await this.findCompetitorRepository.create(
      createFindCompetitorDto,
    );
    await this.findCompetitorRepository.save(findCompertitor);
    return findCompertitor;
  }

  findAll() {
    return this.findCompetitorRepository.find();
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
