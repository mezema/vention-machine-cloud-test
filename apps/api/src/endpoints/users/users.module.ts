import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Cart } from '@ventionMachineCloudTest/models';
import { UsersController } from '../../endpoints/users/users.controller';
import { UsersService } from '../../services/users.service';
import { UsersServiceModule } from '../../services/users-service.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Cart]), UsersServiceModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }