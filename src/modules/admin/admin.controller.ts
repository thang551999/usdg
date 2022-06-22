import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SystemConfigDto } from './dto/system-config.dto';
import { GetRevenueParams } from './dto/get-params.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Put('system-config')
  approveOwnerPlace(@Body() systemConfig: SystemConfigDto) {
    return this.adminService.updateConfig(systemConfig);
  }

  @Get('system-config')
  findAll() {
    return this.adminService.getSystemConfig();
  }

  @Get('dash-board')
  async getRevenue(@Query() getParams: GetRevenueParams) {
    const [revenues, places] = await Promise.all([
      this.adminService.getRevenue(getParams),
      this.adminService.getPlaces(),
    ]);
    return {
      revenue: revenues.revenue,
      orders: revenues.orders,
      numberPlaceAtive: places.length,
    };
  }

  @Get('loan')
  async getLoan() {
    const loans = await this.adminService.getLoans();
    return loans;
  }

  // @Get('system-config')
  // findAll() {
  //   return this.adminService.getSystemConfig();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
