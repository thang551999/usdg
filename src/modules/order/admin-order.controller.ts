import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AdminAuthGuard } from '../auth/jwt.strategy';
@Controller('owner/order')
@UseGuards(AdminAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }
}