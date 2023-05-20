import { Test, TestingModule } from '@nestjs/testing';
import { HistoricController } from '../historic.controller';
import { HistoricService } from '../historic.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Historic } from '../entities/historic.entity';
import { Repository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { ProductService } from '../../product/product.service';

describe('HistoricController', () => {
  let controller: HistoricController;
  let repository: Repository<Historic>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricController],
      providers: [HistoricService,
        {
          provide: getRepositoryToken(Historic),
          useClass: Repository
        },

      ],
    }).compile();
    repository = module.get<Repository<Historic>>(getRepositoryToken(Historic));
    controller = module.get<HistoricController>(HistoricController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
