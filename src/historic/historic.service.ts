import { Injectable } from '@nestjs/common';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { HistoricStatusEnum } from './constants/historicStatus.enum';

@Injectable()
export class HistoricService {
  constructor(
    @InjectRepository(Historic)
    private readonly historicRepository: Repository<Historic>,
  ) {}

  async findAll() {
    return await this.historicRepository.find();
  }

 async create(original: Product, isCreate: boolean, isUpdated: boolean, newProduct?: Product) {
    const historic = new Historic();

    historic.historicProduct = newProduct;
    historic.historicProductAmount = newProduct.productAmount;

    if(isCreate) {
      historic.historicStatus = HistoricStatusEnum.CREATED;
    } else if(isUpdated) {
      if(newProduct.productAmount > original.productAmount) {
        historic.historicStatus = HistoricStatusEnum.UP;
      } else if(newProduct.productAmount < original.productAmount) {
        historic.historicStatus = HistoricStatusEnum.DOWN;
      } else {
        historic.historicStatus = HistoricStatusEnum.EDITED;
      }
    }

    return await this.historicRepository.save(historic);
  } 
}
