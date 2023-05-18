import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock, productUpdatedMock, updateProductDto } from './product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useClass: ProductService,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a product', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce(productUpdatedMock);
    expect (await service.update(1, updateProductDto)).toEqual(productUpdatedMock)
  })  

});

