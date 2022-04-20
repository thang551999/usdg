import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { OwnerAuthGuard } from '../auth/jwt.strategy';
import { API_SUCCESS, PLACE_MESSAGE } from '../../common/constant';
import { GetPlaceParams } from './dto/get-place.dto';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  @UseGuards(OwnerAuthGuard)
  async create(
    @Body() createPlaceDto: CreatePlaceDto,
    @UserInfo() user: IUserInfo,
  ) {
    const place = await this.placeService.create(createPlaceDto, user);
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.CREATE_PLACE_SUCCESS,
      data: place,
    };
  }

  @Get()
  async findAll(@Query() getPlacePama: GetPlaceParams) {
    const places = await this.placeService.findAll(getPlacePama);
    return {
      code: API_SUCCESS,
      data: places,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.placeService.remove(id);
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.DISABLE_SUCCESS,
    };
  }
}
