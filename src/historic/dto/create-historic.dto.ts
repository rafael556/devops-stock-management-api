import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoricDto {
  @IsNumber()
  @IsNotEmpty()
  historicId: number;

  @IsString()
  @IsNotEmpty()
  historicCreatedAt: string;

  @IsString()
  @IsNotEmpty()
  historicStatus: string;

  @IsNumber()
  @IsNotEmpty()
  historicProductAmount: number;

  @IsString()
  @IsNotEmpty()
  productName: string;
}
