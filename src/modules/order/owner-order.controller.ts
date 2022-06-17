import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OwnerAuthGuard, UserAuthGuard } from '../auth/jwt.strategy';

@Controller('owner/order')
@UseGuards(OwnerAuthGuard)
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
