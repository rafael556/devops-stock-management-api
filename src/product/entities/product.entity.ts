import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_entity')
export class Product {
  @PrimaryGeneratedColumn(`increment`)
  productId: number;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'product_description' })
  productDescription: string;

  @Column({ name: 'product_category' })
  productCategory: string;

  @Column({ name: 'product_amount' })
  productAmount: number;

  @Column({ name: 'product_unit_price', type: 'decimal' })
  produtcUnitPrice: number;

  @Column({ name: 'product_supplier' })
  productSupplier: string;

  @CreateDateColumn({ name: 'product_created_at' })
  productCreatedAt: string;
}
