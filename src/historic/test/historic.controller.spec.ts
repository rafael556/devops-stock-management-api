import { Test, TestingModule } from '@nestjs/testing';
import { HistoricController } from '../historic.controller';
import { HistoricService } from '../historic.service';
import { ProductModule } from '../../product/product.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Historic } from '../entities/historic.entity';
import { Repository } from 'typeorm';

describe('HistoricController', () => {
  let controller: HistoricController;
  let repository: Repository<Historic>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      controllers: [HistoricController],
      providers: [HistoricService,
        {
          provide: getRepositoryToken(Historic),
          useClass: Repository
        }
      ],
    }).compile();
    repository = module.get<Repository<Historic>>(getRepositoryToken(Historic));
    controller = module.get<HistoricController>(HistoricController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
