import { Module } from '@nestjs/common';
import { CartsService } from '../../services/carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '@ventionMachineCloudTest/models';
import { CartItem } from '@ventionMachineCloudTest/models';
import { Product } from '@ventionMachineCloudTest/models';
import { User } from '@ventionMachineCloudTest/models';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem, Product, User])],
    providers: [CartsService],
    controllers: [CartsController]
})
export class CartsModule { }
