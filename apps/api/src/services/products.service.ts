import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, Rating } from '@ventionMachineCloudTest/models';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
        @InjectRepository(Rating)
        private ratingsRepository: Repository<Rating>,
    ) {}

    // seed data
    async seed(): Promise<void> {

        const product = this.repository.create({ name: 'Product 1', imageUrl: 'https://picsum.photos/100/200', price: 100, ratings: [] });

        await this.repository.save(product);

        const product2 = this.repository.create({ name: 'Product 2', imageUrl: 'https://picsum.photos/200/300', price: 200, ratings: [] });

        await this.repository.save(product2);

        const product3 = this.repository.create({ name: 'Product 3', imageUrl: 'https://picsum.photos/200/400', price: 300, ratings: [] });

        await this.repository.save(product3);

        const product4 = this.repository.create({ name: 'Product 4', imageUrl: 'https://picsum.photos/300/500', price: 400, ratings: [] });

        await this.repository.save(product4);

        const product5 = this.repository.create({ name: 'Product 5', imageUrl: 'https://picsum.photos/300/400', price: 500, ratings: [] });

        await this.repository.save(product5);

        const product6 = this.repository.create({ name: 'Product 6', imageUrl: 'https://picsum.photos/300/600', price: 600, ratings: [] });

        await this.repository.save(product6);
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

    async rate(id: string, rating: number): Promise<Product> {
        const product = await this.repository.findOne(id, { relations: ['ratings'] });
        const newRating = this.ratingsRepository.create({ rating });
        await this.ratingsRepository.save(newRating);

        if (Array.isArray(product.ratings)) {
            product.ratings.push(newRating);
        } else {
            product.ratings = [newRating];
        }
        await this.repository.save(product);

        return product;
    }

    async getRating(id: string): Promise<number> {
        const product = await this.repository.findOne(id, { relations: ['ratings'] });
        let average: number;
        if (Array.isArray(product.ratings)) {
            const ratings = product.ratings.map(rating => rating.rating);
            const total = ratings.reduce((aVal, bVal) => aVal + bVal, 0);
            average = total / ratings.length;
        } else {
            average = 0;
        }
    
        return average;
    }    
}
