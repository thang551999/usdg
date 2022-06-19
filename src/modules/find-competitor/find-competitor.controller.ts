import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FindCompetitorService } from './find-competitor.service';
import {
  CreateFindCompetitorDto,
  GetParamsFindCompetitor,
} from './dto/create-find-competitor.dto';
import { UpdateFindCompetitorDto } from './dto/update-find-competitor.dto';
import { API_SUCCESS } from '../../common/constant';

@Controller('find-competitor')
export class FindCompetitorController {
  constructor(private readonly findCompetitorService: FindCompetitorService) {}

  @Post()
  create(@Body() createFindCompetitorDto: CreateFindCompetitorDto) {
    return this.findCompetitorService.create(createFindCompetitorDto);
  }

  @Get()
  async findAll(@Query() getParams: GetParamsFindCompetitor) {
    const findCompetitor = await this.findCompetitorService.findAll(getParams);
    return {
      code: API_SUCCESS,
      data: findCompetitor,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.findCompetitorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFindCompetitorDto: UpdateFindCompetitorDto,
  // ) {
  //   return this.findCompetitorService.update(+id, updateFindCompetitorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.findCompetitorService.remove(+id);
  // }
}
