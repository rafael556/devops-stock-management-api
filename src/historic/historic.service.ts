import { Injectable } from '@nestjs/common';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoricService {
  constructor(
    @InjectRepository(Historic)
    private readonly historicRepository: Repository<Historic>,
  ) {}

  async findAll() {
    return await this.historicRepository.find();
  }

  async create(CreateHistoricDto: CreateHistoricDto) {
    const historic = new Historic();

    historic.historicProductAmount = CreateHistoricDto.historicProductAmount;
    historic.historicStatus = CreateHistoricDto.historicStatus;

    return await this.historicRepository.save(historic);
  }
}
