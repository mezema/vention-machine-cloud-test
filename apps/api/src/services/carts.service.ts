import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Cart } from "@ventionMachineCloudTest/models"
import { CartItem } from "@ventionMachineCloudTest/models"
import { Product } from "@ventionMachineCloudTest/models"
import { User } from "@ventionMachineCloudTest/models"
import { Repository } from "typeorm"

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartsRepository.find()
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne(id, { relations: ["cartItems", "cartItems.product"] })
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`)
    }

    return cart
  }

  async create(data: Partial<Cart>): Promise<Cart> {
    const cart = this.cartsRepository.create(data)

    return this.cartsRepository.save(cart)
  }

  async update(id: number, changes: Partial<Cart>): Promise<Cart> {
    const cart = await this.cartsRepository.findOne(id)
    this.cartsRepository.merge(cart, changes)

    return this.cartsRepository.save(cart)
  }

  async remove(id: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne(id)

    return this.cartsRepository.remove(cart)
  }

  async addItemToCart(cartId: number, productId: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne(cartId, { relations: ["cartItems"] })
    const product = await this.productsRepository.findOne(productId)
    const item = await this.cartItemsRepository.findOne({ where: { cart, product } })
    if (item) {
      item.quantity++
      await this.cartItemsRepository.save(item)
    } else {
      const newItem = this.cartItemsRepository.create({ quantity: 1, cart, product })
      cart.cartItems.push(newItem)
      await this.cartItemsRepository.save(newItem)
    }

    return this.cartsRepository.save(cart)
  }

  async removeItemFromCart(cartId: number, productId: number): Promise<Cart> {
    const cart = await this.cartsRepository.findOne(cartId, { relations: ["cartItems"] })
    const product = await this.productsRepository.findOne(productId, { relations: ["cartItems"] })
    const item = await this.cartItemsRepository.findOne({ where: { cart, product } })
    if (item) {
      item.quantity--
      if (item.quantity === 0) {
        await this.cartItemsRepository.remove(item)
      } else {
        await this.cartItemsRepository.save(item)
      }
    } else {
      throw new NotFoundException(`Item not found in cart`)
    }

    return this.cartsRepository.save(cart)
  }

  async getUserCart(userId: number): Promise<Cart> {
    const user = await this.usersRepository.findOne(userId, { relations: ["carts"] })
    if (!user.carts.length) {
      const cart = await this.cartsRepository.create({ user })

      return this.cartsRepository.save(cart)
    }

    return user.carts[0]
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    const cart = await this.cartsRepository.findOne(cartId, { relations: ["cartItems"] })
    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`)
    }

    // join the product table to the cartItems table
    const cartItems = await this.cartItemsRepository.find({ where: { cart }, relations: ["product"] })

    return cartItems
  }

  async getCartItem(cartId: number, productId: number): Promise<CartItem> {
    const cart = await this.cartsRepository.findOne(cartId, { relations: ["cartItems"] })
    const product = await this.productsRepository.findOne(productId)
    const item = await this.cartItemsRepository.findOne({ where: { cart, product } })
    if (!item) {
      throw new NotFoundException(`Item not found in cart`)
    }

    return item
  }

  async itemExists(cartId: number, productId: number): Promise<boolean> {
    const cart = await this.cartsRepository.findOne(cartId, { relations: ["cartItems"] })
    const product = await this.productsRepository.findOne(productId, { relations: ["cartItems"] })
    const item = await this.cartItemsRepository.findOne({ where: { cart, product } })

    console.log("item", item)
    if (item === undefined || !item) {
      return false
    }

    return true
  }
}
