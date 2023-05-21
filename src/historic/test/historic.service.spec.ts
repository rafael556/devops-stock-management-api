import { Test, TestingModule } from '@nestjs/testing';
import { HistoricService } from '../historic.service';
import { Historic } from '../entities/historic.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productMock } from '../../product/test/product.mock';
import { HistoricStatusEnum } from '../constants/historicStatus.enum';
import { historicMock } from './historic.mock';

describe('HistoricService', () => {
  let service: HistoricService;
  let repository: Repository<Historic>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoricService,
        {
          provide: getRepositoryToken(Historic),
          useClass: Repository,
        },
      ],
    }).compile();
    repository = module.get<Repository<Historic>>(getRepositoryToken(Historic));
    service = module.get<HistoricService>(HistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create historic record', async () => {
    jest.spyOn(repository, 'save').mockResolvedValueOnce(historicMock);

    expect(
      await service.create(productMock, HistoricStatusEnum.CREATED),
    ).toEqual(historicMock);
    expect(historicMock.historicProduct).toEqual(productMock);
  });

  it('should return list of products on findAll', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([historicMock]);
    expect(await service.findAll()).toEqual([historicMock]);
  });
});
