import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createProductDto,
  deleteResult,
  deletedProductMock,
  productMock,
  productUpdatedMock,
  updateProductDto,
  updateProductDtoWithNegativeAmount,
  updateProductMinorDto,
} from './product.mock';
import { HistoricService } from '../../historic/historic.service';
import { Historic } from '../../historic/entities/historic.entity';
import { historicMock } from '../../historic/test/historic.mock';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;
  let historicService: HistoricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        HistoricService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Historic),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    historicService = module.get<HistoricService>(HistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create product', async () => {
    jest.spyOn(repository, 'save').mockResolvedValueOnce(productMock);
    jest.spyOn(historicService, 'create').mockResolvedValue(historicMock);
    expect(await service.create(createProductDto)).toBe(productMock);
  });

  it('should return list of products on findAll', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([productMock]);
    expect(await service.findAll()).toEqual([productMock]);
  });

  it('should update a product with higher amount', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(productUpdatedMock);
    jest.spyOn(historicService, 'create').mockResolvedValue(historicMock);
    expect(await service.update(1, updateProductDto)).toEqual(
      productUpdatedMock,
    );
  });

  it('should update a product with minor amount', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(productUpdatedMock);
    jest.spyOn(historicService, 'create').mockResolvedValue(historicMock);
    expect(await service.update(1, updateProductMinorDto)).toEqual(
      productUpdatedMock,
    );
  });

  it('should throw error when update product amount is negative', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);
    await expect(
      service.update(1, updateProductDtoWithNegativeAmount),
    ).rejects.toThrowError();
  });

  it('should delete a product', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);
    jest.spyOn(historicService, 'create').mockResolvedValue(historicMock);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(deletedProductMock);
    const productId = 1;
    const result = await service.remove(productId);
    expect(result).toEqual(deletedProductMock);
  });
});
