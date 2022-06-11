import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import {
  CreatePlaceDto,
  CreateServiceDto,
  TimeGold,
} from './dto/create-place.dto';
import { OwnerAuthGuard } from '../auth/jwt.strategy';
import { API_SUCCESS, PLACE_MESSAGE } from '../../common/constant';
import { IUserInfo, UserInfo } from '../../common/decorators/user.decorator';
import { UpdatePlaceDto } from './dto/update-place.dto';

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

  @Post('service')
  async createService(
    @Body() createServiceDto: CreateServiceDto,
    @UserInfo() user: IUserInfo,
  ) {
    const place = await this.placeService.createService(createServiceDto, user);
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.CREATE_SERVICE_SUCCESS,
      data: place,
    };
  }

  @Post('time-gold')
  async createTimeGold(
    @Body() timeGoldDto: TimeGold,
    @UserInfo() user: IUserInfo,
  ) {
    const place = await this.placeService.createTimeGold(timeGoldDto, user);
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.CREATE_SERVICE_SUCCESS,
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @UseGuards(OwnerAuthGuard)
  async remove(@Param('id') id: string, @UserInfo() user: IUserInfo) {
    await this.placeService.remove(id, user);
    return {
      code: API_SUCCESS,
      message: PLACE_MESSAGE.DISABLE_SUCCESS,
    };
  }
}
