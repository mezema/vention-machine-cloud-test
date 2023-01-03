import { Entity, Column, OneToMany } from 'typeorm';
import { RootEntity } from './root.entity';
import { Rating } from './rating.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Product extends RootEntity {
    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @OneToMany(() => Rating, rating => rating.product)
    ratings: Rating[];

    @Column()
    price: number;

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];
}