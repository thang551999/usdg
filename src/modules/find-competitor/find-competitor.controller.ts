import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindCompetitorService } from './find-competitor.service';
import {
  CreateFindCompetitorDto,
  GetParamsFindCompetitor,
} from './dto/create-find-competitor.dto';
import { UpdateFindCompetitorDto } from './dto/update-find-competitor.dto';
import { API_SUCCESS } from '../../common/constant';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';
import { UserAuthGuard } from '../auth/jwt.strategy';

@Controller('find-competitor')
export class FindCompetitorController {
  constructor(private readonly findCompetitorService: FindCompetitorService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  create(
    @Body() createFindCompetitorDto: CreateFindCompetitorDto,
    @UserInfo() user: IUserInfo,
  ) {
    return this.findCompetitorService.create(createFindCompetitorDto, user);
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
