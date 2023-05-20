import { Test, TestingModule } from '@nestjs/testing';
import { HistoricService } from '../historic.service';
import { Historic } from '../entities/historic.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('HistoricService', () => {
  let service: HistoricService;
  let repository: Repository<Historic>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricService,
      {
        provide: getRepositoryToken(Historic),
        useClass: Repository
      }
      ],
    }).compile();
    repository = module.get<Repository<Historic>>(getRepositoryToken(Historic));
    service = module.get<HistoricService>(HistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
