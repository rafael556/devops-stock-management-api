import { Controller, Get } from '@nestjs/common';
import { HistoricService } from './historic.service';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get()
  async findAll() {
    return this.historicService.findAll();
  }
}
