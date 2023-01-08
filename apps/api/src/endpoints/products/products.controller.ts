import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Product } from "@ventionMachineCloudTest/models"

import { ProductsService } from "../../services/products.service"

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("seed")
  async seed(): Promise<string> {
    await this.productsService.seed()

    return "seeded products"
  }

  @Get()
  async findAll(@Query("page") page = 1): Promise<Product[]> {
    return this.productsService.findAll(page)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Product> {
    return this.productsService.findOne(id)
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product)
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() product: Product): Promise<Product> {
    return this.productsService.update(id, product)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Product> {
    return this.productsService.remove(id)
  }

  // Get rating for a product
  @Get(":id/rating")
  async getRating(@Param("id") id: string): Promise<number> {
    return this.productsService.getRating(id)
  }

  // rate a product
  @Post(":id/rating")
  async rate(@Param("id") id: string, @Body("rating") rating: number): Promise<Product> {
    return this.productsService.rate(id, rating)
  }
}
