import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { HistoricService } from 'src/historic/historic.service';
import { HistoricModule } from 'src/historic/historic.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), HistoricModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
