import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { OwnerAuthGuard } from '../auth/jwt.strategy';
import { API_SUCCESS, PLACE_MESSAGE } from '../../common/constant';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';

@UseGuards(OwnerAuthGuard)
@Controller('owner/place')
export class OwnerPlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
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
  async getTypePlace() {
    const place = await this.placeService.getTypePlaceAdmin();
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.CREATE_PLACE_SUCCESS,
      data: place,
    };
  }
}
