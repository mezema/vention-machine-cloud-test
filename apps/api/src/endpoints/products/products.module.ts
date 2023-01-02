import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@ventionMachineCloudTest/models';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}