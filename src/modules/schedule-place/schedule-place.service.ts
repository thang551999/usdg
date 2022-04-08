import { Injectable } from '@nestjs/common';
import { CreateSchedulePlaceDto } from './dto/create-schedule-place.dto';
import { UpdateSchedulePlaceDto } from './dto/update-schedule-place.dto';

@Injectable()
export class SchedulePlaceService {
  create(createSchedulePlaceDto: CreateSchedulePlaceDto) {
    return 'This action adds a new schedulePlace';
  }

  findAll() {
    return `This action returns all schedulePlace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedulePlace`;
  }

  update(id: number, updateSchedulePlaceDto: UpdateSchedulePlaceDto) {
    return `This action updates a #${id} schedulePlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedulePlace`;
  }
}
