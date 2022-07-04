import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsdgDto } from './dto/create-usdg.dto';
import { UpdateUsdgDto } from './dto/update-usdg.dto';
import { Usdg } from './entities/usdg.entity';

@Injectable()
export class UsdgService {
  constructor(
    @InjectRepository(Usdg)
    private usdgRepository: Repository<Usdg>,
  ) {}
  async findAll() {
    const usdgs = await this.usdgRepository.findOneBy({});
    if (usdgs) {
      return usdgs;
    } else {
      const usdg = await this.usdgRepository.create({
        currenIndex: '1',

        APY: '10',
      });
      await this.usdgRepository.save(usdg);
      return usdg;
    }
  }

  async update(updateUsdgDto) {
    const usdgs = await this.usdgRepository.findOneBy({});
    if (usdgs) {
      await this.usdgRepository.update(
        { id: usdgs.id },
        {
          APY: updateUsdgDto.APY,
        },
      );
      const usdg = await this.usdgRepository.findOneBy({});
      return usdg;
    } else {
      const usdg = await this.usdgRepository.create({
        currenIndex: '1',
        APY: '10',
      });
      await this.usdgRepository.save(usdg);
      return usdg;
    }
  }
}
