import { Column, Entity, OneToMany } from "typeorm"

import { Cart } from "./cart.entity"
import { RootEntity } from "./root.entity"

@Entity()
export class User extends RootEntity {
  @Column()
  username: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[]
}
