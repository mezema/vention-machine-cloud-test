import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { RootEntity } from './root.entity';
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart extends RootEntity {
    @ManyToOne(() => User, user => user.carts)
    user: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItems: CartItem[];
}
