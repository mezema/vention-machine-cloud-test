import { PrimaryGeneratedColumn } from "typeorm"

export abstract class RootEntity {
  @PrimaryGeneratedColumn()
  id: number
}
