import { Entity, Column, ManyToOne } from 'typeorm';
import { RootEntity } from './root.entity';
import { Product } from './product.entity';

@Entity()
export class Rating extends RootEntity {
    @Column()
    rating: number;

    @ManyToOne(() => Product, product => product.ratings)
    product: Product;
}
