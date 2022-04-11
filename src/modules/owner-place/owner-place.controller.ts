import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerPlaceService } from './owner-place.service';
import { CreateOwnerPlaceDto } from './dto/create-owner-place.dto';
import { UpdateOwnerPlaceDto } from './dto/update-owner-place.dto';

@Controller('owner-place')
export class OwnerPlaceController {
  constructor(private readonly ownerPlaceService: OwnerPlaceService) {}

  @Post()
  create(@Body() createOwnerPlaceDto: CreateOwnerPlaceDto) {
    return this.ownerPlaceService.create(createOwnerPlaceDto);
  }

  @Get()
  findAll() {
    return this.ownerPlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerPlaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerPlaceDto: UpdateOwnerPlaceDto) {
    return this.ownerPlaceService.update(+id, updateOwnerPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerPlaceService.remove(+id);
  }
}
