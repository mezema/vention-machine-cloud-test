import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Cart } from "@ventionMachineCloudTest/models"
import { CartItem } from "@ventionMachineCloudTest/models"

import { CartsService } from "../../services/carts.service"

@ApiTags("carts")
@Controller("carts")
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Cart> {
    return this.cartsService.findOne(id)
  }

  @Post()
  create(@Body() cartData: Partial<Cart>): Promise<Cart> {
    return this.cartsService.create(cartData)
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() cartData: Partial<Cart>): Promise<Cart> {
    return this.cartsService.update(id, cartData)
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<Cart> {
    return this.cartsService.remove(id)
  }

  @Post(":cartId/items/:productId")
  addItemToCart(@Param("cartId") cartId: number, @Param("productId") productId: number): Promise<Cart> {
    return this.cartsService.addItemToCart(cartId, productId)
  }

  @Delete(":cartId/items/:productId")
  removeItemFromCart(@Param("cartId") cartId: number, @Param("productId") productId: number): Promise<Cart> {
    return this.cartsService.removeItemFromCart(cartId, productId)
  }

  @Get("user/:userId")
  getUserCart(@Param("userId") userId: number): Promise<Cart> {
    return this.cartsService.getUserCart(userId)
  }

  @Get(":cartId/items")
  getCartItems(@Param("cartId") cartId: number): Promise<CartItem[]> {
    return this.cartsService.getCartItems(cartId)
  }

  @Get(":cartId/items/:productId")
  getCartItem(@Param("cartId") cartId: number, @Param("productId") productId: number): Promise<CartItem> {
    return this.cartsService.getCartItem(cartId, productId)
  }

  @Get(":cartId/items/:productId/exists")
  itemExists(@Param("cartId") cartId: number, @Param("productId") productId: number): Promise<boolean> {
    return this.cartsService.itemExists(cartId, productId)
  }
}
