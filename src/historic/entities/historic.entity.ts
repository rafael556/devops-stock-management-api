
import { Product } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('historic_entity')
export class Historic {
  @PrimaryGeneratedColumn(`increment`)
  historicId: number;

  @CreateDateColumn({ name: 'product_created_at' })
  historicCreatedAt: string;

  @Column({ name: 'historic_status' })
  historicStatus: string;

  @Column({ name: 'product_amount' })
  historicProductAmount: number;

  @ManyToOne(() => Product)
  historicProduct: Product;
}
