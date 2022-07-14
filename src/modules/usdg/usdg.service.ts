import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsdgDto } from './dto/create-usdg.dto';
import { UpdateUsdgDto } from './dto/update-usdg.dto';
import { Usdg } from './entities/usdg.entity';
import { ethers } from 'ethers';
import * as ABI_JSON_TOKEN_REWARD from './abi/token_reward.json';
import * as ABI_JSON_TOKEN from './abi/SxcToken.json';

const CONTRACT_ADDRESS = '0xEbc288AfC58E593A644Ea198F182c2d1F53B6022';
const TOKEN_ADDRESS = '0xFB99D772FBDADC4a453585448E0700195a2c0F26';
const POOL_ADDRESS = '0x1f07c435022f201502b802cc6c585d789b47a15f';
const TOKEN_REWARD = '0x045A82f2Ba50eAB511b8b9c4Df32940663F5bcDC';
const PRIVATE_KEY =
  '0e91b64e115710c7d6d6d7927b8498e25aa3ade54eac1e2b97006e1dba67117e';

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
        fee: '1',
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
          fee: updateUsdgDto.fee,
          time: updateUsdgDto.time,
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

  claim = async (account, amount) => {
    const { time } = await this.usdgRepository.findOneBy({});
    setTimeout(async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
      );
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(
        TOKEN_REWARD,
        ABI_JSON_TOKEN_REWARD.abi,
        wallet,
      );
      await contract.transfer(account, amount);
    }, Number(time) * 60 * 1000);
    return { message: 'ok' };
  };

  unStake = async (account, amount) => {
    const { time } = await this.usdgRepository.findOneBy({});
    setTimeout(async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
      );
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(
        TOKEN_ADDRESS,
        ABI_JSON_TOKEN.abi,
        wallet,
      );
      await contract.transfer(account, amount);
    }, Number(time) * 60 * 1000);
    return { message: 'ok' };
  };
}
