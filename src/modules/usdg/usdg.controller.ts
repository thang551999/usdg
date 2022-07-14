import { Controller, Get, Body, Param, Put, Post } from '@nestjs/common';
import { UsdgService } from './usdg.service';
import { UpdateUsdgDto } from './dto/update-usdg.dto';
import { ClaimDto, CreateUsdgDto } from './dto/create-usdg.dto';

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

  @Post('claim')
  claim(@Body() claimDto: ClaimDto) {
    return this.usdgService.claim(claimDto.account, claimDto.amount);
  }

  @Post('unstake')
  unstake(@Body() unStakeDto: ClaimDto) {
    return this.usdgService.unStake(unStakeDto.account, unStakeDto.amount);
  }
}
