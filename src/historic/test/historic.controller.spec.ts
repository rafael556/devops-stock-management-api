import { Test, TestingModule } from '@nestjs/testing';
import { HistoricController } from '../historic.controller';
import { HistoricService } from '../historic.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Historic } from '../entities/historic.entity';
import { Repository } from 'typeorm';
import { historicMock } from './historic.mock';

describe('HistoricController', () => {
  let controller: HistoricController;
  let service: HistoricService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricController],
      providers: [
        HistoricService,
        {
          provide: getRepositoryToken(Historic),
          useClass: Repository,
        },
      ],
    }).compile();
    controller = module.get<HistoricController>(HistoricController);
    service = module.get<HistoricService>(HistoricService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of products', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([historicMock]);
    expect(await controller.findAll()).toEqual([historicMock]);
  });
});
