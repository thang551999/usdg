import { Injectable } from '@nestjs/common';
import { CreateFindCompetitorDto } from './dto/create-find-competitor.dto';
import { UpdateFindCompetitorDto } from './dto/update-find-competitor.dto';

@Injectable()
export class FindCompetitorService {
  create(createFindCompetitorDto: CreateFindCompetitorDto) {
    return 'This action adds a new findCompetitor';
  }

  findAll() {
    return `This action returns all findCompetitor`;
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
