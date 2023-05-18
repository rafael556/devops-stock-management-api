import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import {
  createProductDto,
  deleteResult,
  productMock,
  productUpdatedMock,
  updateProductDto,
  updateProductDtoWithNegativeAmount,
} from './product.mock';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should create product', async () => {
    jest.spyOn(repository, 'save').mockResolvedValueOnce(productMock);



    expect(await service.create(createProductDto)).toBe(productMock);
  });

  it('should return list of products on findAll', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([productMock]);
    expect(await service.findAll()).toEqual([productMock]);
  });

  it('should update a product', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(productUpdatedMock);
    expect(await service.update(1, updateProductDto)).toEqual(
      productUpdatedMock,
    );
  });

  it('should throw error when update product amount is negative', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);
    await expect(service.update(1, updateProductDtoWithNegativeAmount)).rejects.toThrowError()
  })

  it('should delete a product',async () => {
    jest.spyOn(repository, 'delete').mockResolvedValueOnce(deleteResult);

    const productId = 1;
    const result = await service.remove(productId);
    expect(repository.delete).toHaveBeenCalledWith(productId);
    expect(result).toEqual(deleteResult);
  }) 
});
