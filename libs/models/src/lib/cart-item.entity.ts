import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { RootEntity } from './root.entity';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity()
export class CartItem extends RootEntity {
    @Column()
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart: Cart;

    @ManyToOne(() => Product, product => product.cartItems)
    @JoinColumn({ name: 'productId' })
    product: Product;
}