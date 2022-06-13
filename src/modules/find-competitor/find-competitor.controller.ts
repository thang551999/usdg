import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FindCompetitorService } from './find-competitor.service';
import { CreateFindCompetitorDto } from './dto/create-find-competitor.dto';
import { UpdateFindCompetitorDto } from './dto/update-find-competitor.dto';

@Controller('find-competitor')
export class FindCompetitorController {
  constructor(private readonly findCompetitorService: FindCompetitorService) {}

  @Post()
  create(@Body() createFindCompetitorDto: CreateFindCompetitorDto) {
    return this.findCompetitorService.create(createFindCompetitorDto);
  }

  @Get()
  findAll() {
    return this.findCompetitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCompetitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFindCompetitorDto: UpdateFindCompetitorDto) {
    return this.findCompetitorService.update(+id, updateFindCompetitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.findCompetitorService.remove(+id);
  }
}
