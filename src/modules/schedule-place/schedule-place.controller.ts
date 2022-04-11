import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulePlaceService } from './schedule-place.service';
import { CreateSchedulePlaceDto } from './dto/create-schedule-place.dto';
import { UpdateSchedulePlaceDto } from './dto/update-schedule-place.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Api lich sân thể thao')
@ApiConsumes('Auth Api')
@Controller('schedule-place')
export class SchedulePlaceController {
  constructor(private readonly schedulePlaceService: SchedulePlaceService) {}

  @Post('admin')
  createPlace(@Body() createSchedulePlaceDto: CreateSchedulePlaceDto) {
    return this.schedulePlaceService.create(createSchedulePlaceDto);
  }

  @Post('user')
  createSchedule(@Body() createSchedulePlaceDto: CreateSchedulePlaceDto) {
    return this.schedulePlaceService.create(createSchedulePlaceDto);
  }

  @Get('user')
  findAll() {
    return this.schedulePlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulePlaceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchedulePlaceDto: UpdateSchedulePlaceDto,
  ) {
    return this.schedulePlaceService.update(+id, updateSchedulePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulePlaceService.remove(+id);
  }
}
