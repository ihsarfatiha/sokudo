import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { QueryProductsDto } from './dto/query-products.dto';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('categories')
  getCategories() {
    return this.catalogService.getCategories();
  }

  @Get('stores')
  getStores() {
    return this.catalogService.getStores();
  }

  @Get('products')
  getProducts(@Query() query: QueryProductsDto) {
    return this.catalogService.getProducts(query);
  }

  @Get('products/:slug')
  getProduct(@Param('slug') slug: string) {
    return this.catalogService.getProductBySlug(slug);
  }
}
