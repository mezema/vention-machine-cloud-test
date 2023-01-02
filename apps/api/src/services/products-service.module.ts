import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from "@ventionMachineCloudTest/models"

import { ProductsService } from "./products.service"

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService],
    exports: [ProductsService],
    controllers: [],
})
export class ProductsServiceModule {}

