import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"

import { Cart } from "./cart.entity"
import { Product } from "./product.entity"
import { RootEntity } from "./root.entity"

@Entity()
export class CartItem extends RootEntity {
  @Column()
  quantity: number

  @ManyToOne(() => Cart, cart => cart.cartItems)
  cart: Cart

  @ManyToOne(() => Product, product => product.cartItems)
  @JoinColumn({ name: "productId" })
  product: Product
}
