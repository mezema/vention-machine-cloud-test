import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Cart, CartItem, Product, User } from "@ventionMachineCloudTest/models"

import { CartsService } from "./carts.service"

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product, User])],
  providers: [CartsService],
  exports: [CartsService],
  controllers: [],
})
export class CartsServiceModule {}
