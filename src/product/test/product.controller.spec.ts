import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
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
} from './product.mock';
import { HistoricService } from '../../historic/historic.service';
import { Historic } from '../../historic/entities/historic.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
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

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a product', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce(productUpdatedMock);
    expect(await controller.update(1, updateProductDto)).toEqual(
      productUpdatedMock,
    );
  });

  it('should return a list of products', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([productMock]);
    expect(await controller.findAll()).toEqual([productMock]);
  });

  it('should delete a product', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(deletedProductMock);
    expect(await controller.remove(1)).toEqual(deletedProductMock);
  });

  it('should create a product', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(productMock);
    expect(await controller.create(createProductDto)).toBe(productMock);
  });
});
