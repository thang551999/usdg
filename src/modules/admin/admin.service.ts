import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { SystemConfigDto } from './dto/system-config.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import SystemConfigEntity from './entities/system-config.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(SystemConfigEntity)
    private systemConfigRepository: Repository<SystemConfigEntity>,
  ) {}
  async getSystemConfig() {
    const systemConfig = await this.systemConfigRepository.findOne({});
    if (systemConfig) {
      return systemConfig;
    } else {
      return {
        gasFee: '0',
        dateRefundMoney: 30,
      };
    }
    return 'This action adds a new admin';
  }

  async updateConfig(systemConfig: SystemConfigDto) {
    const isExistSystemConfig = await this.systemConfigRepository.findOne({});
    if (isExistSystemConfig) {
      await this.systemConfigRepository.update(
        {
          id: isExistSystemConfig.id,
        },
        {
          gasFee: systemConfig.gasFee,
          dateRefundMoney: systemConfig.dateRefundMoney,
        },
      );
    } else {
      const system = await this.systemConfigRepository.create(systemConfig);
      await this.systemConfigRepository.save(system);
    }
    return systemConfig;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
