import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

import { CartItem } from "./cart-item.entity"
import { RootEntity } from "./root.entity"
import { User } from "./user.entity"

@Entity()
export class Cart extends RootEntity {
  @ManyToOne(() => User, user => user.carts)
  user: User

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems: CartItem[]
}
