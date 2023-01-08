import { Column, Entity, OneToMany } from "typeorm"

import { CartItem } from "./cart-item.entity"
import { Rating } from "./rating.entity"
import { RootEntity } from "./root.entity"

@Entity()
export class Product extends RootEntity {
  @Column()
  name: string

  @Column()
  imageUrl: string

  @OneToMany(() => Rating, rating => rating.product)
  ratings: Rating[]

  @Column()
  price: number

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[]
}
