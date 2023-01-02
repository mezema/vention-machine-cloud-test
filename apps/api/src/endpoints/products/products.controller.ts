import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '@ventionMachineCloudTest/models';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('seed')
    async seed(): Promise<string> {
        await this.productsService.seed();
        
        return 'seeded products';
    }

    @Get()
    async findAll(@Query('page') page = 1): Promise<Product[]> {      
        return this.productsService.findAll(page);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Post()
    async create(@Body() product: Product): Promise<Product> {
        return this.productsService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id);
    }
}
