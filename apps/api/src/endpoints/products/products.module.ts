import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product, Rating } from "@ventionMachineCloudTest/models"

import { ProductsService } from "../../services/products.service"
import { ProductsController } from "./products.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Product, Rating])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
