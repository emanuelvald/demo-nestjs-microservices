import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable } from 'rxjs';
import { ProductInterface } from './interface/product.interface';
import { ProductPatternsEnum } from './product.enum';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  private _productProxyUser = this.rmqService.clientProxyProduct();

  constructor(private readonly rmqService: ProxyService) {}

  @Get()
  selectProducts(): Observable<ProductInterface[]> {
    return this._productProxyUser.send(
      ProductPatternsEnum.SELECT_ALL_PRODUCT,
      null,
    );
  }

  @Get('/:id')
  selectProduct(@Param('id') id: number): Observable<ProductInterface> {
    return this._productProxyUser.send(
      ProductPatternsEnum.SELECT_ONE_PRODUCT,
      id,
    );
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Observable<ProductInterface> {
    return this._productProxyUser.send(
      ProductPatternsEnum.CREATE_ONE_PRODUCT,
      createProductDto,
    );
  }

  @Put()
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
  ): Observable<ProductInterface> {
    return this._productProxyUser.send(
      ProductPatternsEnum.UPDATE_ONE_PRODUCT,
      updateProductDto,
    );
  }
}
