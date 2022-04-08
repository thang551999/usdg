import { Test, TestingModule } from '@nestjs/testing';
import { SchedulePlaceController } from './schedule-place.controller';
import { SchedulePlaceService } from './schedule-place.service';

describe('SchedulePlaceController', () => {
  let controller: SchedulePlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulePlaceController],
      providers: [SchedulePlaceService],
    }).compile();

    controller = module.get<SchedulePlaceController>(SchedulePlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
