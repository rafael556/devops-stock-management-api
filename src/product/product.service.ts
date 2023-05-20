import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricService } from '../historic/historic.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly historicService: HistoricService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product();

    product.productName = createProductDto.productName;
    product.productDescription = createProductDto.productDescription;
    product.productAmount = createProductDto.productAmount;
    product.productCategory = createProductDto.productCategory;
    product.produtcUnitPrice = createProductDto.produtcUnitPrice;
    product.productSupplier = createProductDto.productSupplier;

    await this.historicService.create(product, true, false);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { productAmount, ...rest } = updateProductDto;
    if (productAmount < 0) {
      console.log(productAmount);
      throw new Error('Invalid amount');
    }
    const productToUpdate = await this.productRepository.findOne({
      where: { productId: id },
    });
    const newProduct = Object.assign(productToUpdate, rest, { productAmount });

    await this.historicService.create(productToUpdate, false, true, newProduct);
    return await this.productRepository.save(productToUpdate, null, );
  }

  async remove(productId: number) {
    return await this.productRepository.delete(productId);
  }
}
