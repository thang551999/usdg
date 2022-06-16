import { Controller, Get, Post, Param, UseGuards, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { UserAuthGuard } from '../auth/jwt.strategy';
import { API_SUCCESS, PLACE_MESSAGE } from '../../common/constant';
import { GetPlaceParams } from './dto/get-place.dto';
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('order')
  @UseGuards(UserAuthGuard)
  async createSchedule() {
    const place = await this.placeService.createOrder();
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

  @Get('type-place')
  async getType() {
    const places = await this.placeService.getTypePlace();
    return {
      code: API_SUCCESS,
      data: places,
    };
  }

  @Get('available/:id')
  async getAvailableTime(@Param('id') id: string, @Query() day: string) {
    const place = await this.placeService.getTimeAvailable(id, day);
    return {
      code: API_SUCCESS,
      data: place,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const place = await this.placeService.findOne(id);
    return {
      code: API_SUCCESS,
      data: place,
    };
  }
}
