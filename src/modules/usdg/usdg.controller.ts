import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { UsdgService } from './usdg.service';
import { UpdateUsdgDto } from './dto/update-usdg.dto';
import { CreateUsdgDto } from './dto/create-usdg.dto';

@Controller('usdg')
export class UsdgController {
  constructor(private readonly usdgService: UsdgService) {}

  @Get()
  findAll() {
    return this.usdgService.findAll();
  }

  @Put('')
  update(@Body() updateUsdgDto: CreateUsdgDto) {
    return this.usdgService.update(updateUsdgDto);
  }
}
