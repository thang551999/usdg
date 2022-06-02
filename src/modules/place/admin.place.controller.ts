import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { PlaceService } from './place.service';
import { TypePlaceDto } from './dto/create-place.dto';
import { AdminAuthGuard } from '../auth/jwt.strategy';
import { API_SUCCESS, PLACE_MESSAGE } from '../../common/constant';

@UseGuards(AdminAuthGuard)
@Controller('admin/place')
export class AdminPlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('type-place')
  async createTypePlace(@Body() typePlaceDto: TypePlaceDto) {
    const place = await this.placeService.createTypePlace(typePlaceDto);
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.CREATE_PLACE_SUCCESS,
      data: place,
    };
  }

  @Get()
  async getTypePlace() {
    const place = await this.placeService.getTypePlaceAdmin();
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.CREATE_PLACE_SUCCESS,
      data: place,
    };
  }
}
