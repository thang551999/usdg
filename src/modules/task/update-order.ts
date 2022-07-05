import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { Repository } from 'typeorm';
import { Usdg } from '../usdg/entities/usdg.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Usdg)
    private usdgRepository: Repository<Usdg>,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cronJobUsdg() {
    const usdgs = await this.usdgRepository.findOneBy({});
    await this.usdgRepository.update(
      { id: usdgs.id },
      {
        currenIndex: new BigNumber(Number(usdgs.APY) / 35600)
          .plus(new BigNumber(usdgs.currenIndex))
          .decimalPlaces(4)
          .toString(),
      },
    );
  }
}
