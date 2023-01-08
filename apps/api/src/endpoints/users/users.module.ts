import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Cart, User } from "@ventionMachineCloudTest/models"

import { UsersController } from "../../endpoints/users/users.controller"
import { UsersServiceModule } from "../../services/users-service.module"
import { UsersService } from "../../services/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart]), UsersServiceModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
