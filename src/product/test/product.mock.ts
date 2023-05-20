import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export const productMock: Product = {
  productId: 1,
  productName: 'produto',
  productDescription: 'produto',
  productCategory: 'produto',
  productAmount: 1,
  produtcUnitPrice: 0,
  productSupplier: 'amazon',
  productCreatedAt: '2023-05-14',
  productIsActive: true,
};

export const updateProductDto: UpdateProductDto = {
  productName: 'produto',
  productDescription: 'produto',
  productCategory: 'produto',
  productAmount: 10,
  produtcUnitPrice: 0,
  productSupplier: 'mercado livre',
};

export const updateProductDtoWithNegativeAmount: UpdateProductDto = {
  productName: 'produto',
  productDescription: 'produto',
  productCategory: 'produto',
  productAmount: -2,
  produtcUnitPrice: 0,
  productSupplier: 'mercado livre',
};

export const productUpdatedMock: Product = {
  productId: 1,
  productName: 'produto',
  productDescription: 'produto',
  productCategory: 'produto',
  productAmount: 10,
  produtcUnitPrice: 0,
  productSupplier: 'mercado livre',
  productCreatedAt: '2023-05-14',
  productIsActive: true,
};

export const deleteResult: DeleteResult = {
  affected: 1,
  raw: undefined,
};

export const createProductDto: CreateProductDto = {
  productName: 'produto',
  productDescription: 'produto',
  productCategory: 'produto',
  productAmount: 1,
  produtcUnitPrice: 0,
  productSupplier: 'amazon',
};
