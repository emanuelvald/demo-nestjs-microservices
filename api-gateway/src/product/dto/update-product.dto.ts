import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  category: number;

  @IsNumber()
  @IsOptional()
  manufacturer: number;
}
