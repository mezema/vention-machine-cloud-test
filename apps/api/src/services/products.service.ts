import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@ventionMachineCloudTest/models';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
    ) {}

    /*
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

    @OneToMany(() => Rating, rating => rating.product, { lazy: true })
    ratings: Rating[];

    @Column()
    price: number;

    @OneToMany(() => CartItem, cartItem => cartItem.product, { lazy: true })
    cartItems: CartItem[];
}*/
    // seed data
    async seed(): Promise<void> {

        const product = this.repository.create({ name: 'Product 1', imageUrl: 'https://picsum.photos/200/300', price: 100 });

        await this.repository.save(product);
    }

    async findAll(page = 1): Promise<Product[]> {
        return this.repository.find({
            relations: ['ratings'],
            take: 10,
            skip: 10 * (page - 1),
        });
    }

    async findOne(id: string): Promise<Product> {
        return this.repository.findOne(id, { relations: ['ratings'] });
    }

    async create(product: Product): Promise<Product> {
        return this.repository.save(product);
    }

    async update(id: string, product: Product): Promise<Product> {
        await this.repository.update(id, product);
        
        return this.repository.findOne(id);
    }

    async remove(id: string): Promise<Product> {
        const product = await this.repository.findOne(id);
        await this.repository.delete(id);
        
        return product;
    }
}
