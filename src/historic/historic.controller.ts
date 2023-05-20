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
import { UpdateHistoricDto } from './dto/update-historic.dto';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Post()
  create(@Body() createHistoricDto: CreateHistoricDto) {
    return this.historicService.create(createHistoricDto);
  }

  @Get()
  findAll() {
    return this.historicService.findAll();
  }
}
