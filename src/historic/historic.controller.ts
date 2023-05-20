import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoricService } from './historic.service';
import { CreateHistoricDto } from './dto/create-historic.dto';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get()
  async findAll() {
    return this.historicService.findAll();
  }
}
