import { Min, IsNotEmpty, IsString, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @IsString()
  @IsNotEmpty()
  productCategory: string;

  @Min(1)
  @IsNotEmpty()
  productAmount: number;

  @Min(0)
  @IsDecimal()
  @IsNotEmpty()
  produtcUnitPrice: number;

  @IsString()
  @IsNotEmpty()
  productSupplier: string;
}
