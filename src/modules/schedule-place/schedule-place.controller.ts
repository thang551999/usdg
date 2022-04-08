import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulePlaceService } from './schedule-place.service';
import { CreateSchedulePlaceDto } from './dto/create-schedule-place.dto';
import { UpdateSchedulePlaceDto } from './dto/update-schedule-place.dto';

@Controller('schedule-place')
export class SchedulePlaceController {
  constructor(private readonly schedulePlaceService: SchedulePlaceService) {}

  @Post()
  create(@Body() createSchedulePlaceDto: CreateSchedulePlaceDto) {
    return this.schedulePlaceService.create(createSchedulePlaceDto);
  }

  @Get()
  findAll() {
    return this.schedulePlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulePlaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchedulePlaceDto: UpdateSchedulePlaceDto) {
    return this.schedulePlaceService.update(+id, updateSchedulePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulePlaceService.remove(+id);
  }
}
