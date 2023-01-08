import { Column, Entity, ManyToOne } from "typeorm"

import { Product } from "./product.entity"
import { RootEntity } from "./root.entity"

@Entity()
export class Rating extends RootEntity {
  @Column()
  rating: number

  @ManyToOne(() => Product, product => product.ratings)
  product: Product
}
