import { Test, TestingModule } from '@nestjs/testing';
import { SchedulePlaceService } from './schedule-place.service';

describe('SchedulePlaceService', () => {
  let service: SchedulePlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulePlaceService],
    }).compile();

    service = module.get<SchedulePlaceService>(SchedulePlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
