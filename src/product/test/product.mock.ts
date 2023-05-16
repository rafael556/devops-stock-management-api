import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export const productMock: Product = {
  productId: 1,
  productName: 'produto',
  productDescription: 'produto',
  productCategory: 'produto',
  productAmount: 1,
  produtcUnitPrice: 0,
  productSupplier: 'amazon',
  productCreatedAt: '2023-05-14',
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
};
