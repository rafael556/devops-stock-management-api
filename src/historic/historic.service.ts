import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { HistoricStatusEnum } from './constants/historicStatus.enum';
import { HistoricDto } from './dto/historicDto.dto';

@Injectable()
export class HistoricService {
  constructor(
    @InjectRepository(Historic)
    private readonly historicRepository: Repository<Historic>,
  ) {}

  async findAll() {
    const historic: Historic[] = await this.historicRepository
      .createQueryBuilder('historic')
      .leftJoinAndSelect('historic.historicProduct', 'product')
      .getMany();

    const historicDtoList: HistoricDto[] = [];
    historic.forEach((e) => {
      const historicDto: HistoricDto = {
        historicId: e.historicId,
        historicCreatedAt: e.historicCreatedAt,
        historicStatus: e.historicStatus,
        ProductAmount: e.historicProductAmount,
        productName: e.historicProduct.productName,
      };
      historicDtoList.push(historicDto);
    });
    return historicDtoList;
  }

  async create(newProduct: Product, historicStatus: HistoricStatusEnum) {
    const historic = new Historic();

    historic.historicProduct = newProduct;
    historic.historicProductAmount = newProduct.productAmount;
    historic.historicStatus = historicStatus;

    return await this.historicRepository.save(historic);
  }
}
