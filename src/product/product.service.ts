import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricService } from '../historic/historic.service';
import { HistoricStatusEnum } from '../historic/constants/historicStatus.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly historicService: HistoricService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product();

    try {
      product.productName = createProductDto.productName;
      product.productDescription = createProductDto.productDescription;
      product.productAmount = createProductDto.productAmount;
      product.productCategory = createProductDto.productCategory;
      product.produtcUnitPrice = createProductDto.produtcUnitPrice;
      product.productSupplier = createProductDto.productSupplier;
      product.productIsActive = true;

      const saved = await this.productRepository.save(product);
      await this.historicService.create(saved, HistoricStatusEnum.CREATED);
      return saved;
    } catch (e) {
      console.error(e);
    }
  }

  async findAll() {
    return await this.productRepository.find({
      where: { productIsActive: true },
    });
  }

  //TODO Testar todas as branches da função
  async update(id: number, updateProductDto: UpdateProductDto) {
    const { productAmount, ...rest } = updateProductDto;
    if (productAmount < 0) {
      throw new Error('Invalid amount');
    }
    const productToUpdate = await this.productRepository.findOne({
      where: { productId: id },
    });
    Object.assign(productToUpdate, rest, { productAmount });

    let historicEnum: HistoricStatusEnum = HistoricStatusEnum.EDITED;

    if (updateProductDto.productAmount > productToUpdate.productAmount) {
      historicEnum = HistoricStatusEnum.UP;
    } else if (updateProductDto.productAmount < productToUpdate.productAmount) {
      historicEnum = HistoricStatusEnum.DOWN;
    }

    await this.historicService.create(productToUpdate, historicEnum);
    return await this.productRepository.save(productToUpdate);
  }

  async remove(productId: number) {
    const product = await this.productRepository.findOne({
      where: { productId: productId },
    });

    product.productIsActive = false;

    await this.historicService.create(product, HistoricStatusEnum.DELETED);
    return await this.productRepository.save(product);
  }
}
