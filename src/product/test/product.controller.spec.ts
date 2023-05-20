import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createProductDto,
  deleteResult,
  productMock,
  productUpdatedMock,
  updateProductDto,
  updateProductDtoWithNegativeAmount,
} from './product.mock';
import { create } from 'domain';
import { CreateProductDto } from '../dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  //let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValueOnce([productMock]),
            create: jest.fn().mockResolvedValueOnce(productMock),
            remove: jest.fn().mockResolvedValueOnce(deleteResult),
            update: jest.fn().mockResolvedValueOnce(productUpdatedMock),
          },
        },
        // {
        //   provide: getRepositoryToken(Product),
        //   useClass: Repository,
        // },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
    // repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a product', async () => {
    expect(await controller.update(1, updateProductDto)).toEqual(
      productUpdatedMock,
    );
  });

  it('should return a list of products', async () => {
    expect(await controller.findAll()).toEqual([productMock]);
  });

  it('should delete a product', async () => {
    expect(await controller.remove(1)).toEqual(deleteResult);
  });

  it('should create a product', async () => {
    expect(await controller.create(createProductDto)).toBe(productMock);
  });
});
