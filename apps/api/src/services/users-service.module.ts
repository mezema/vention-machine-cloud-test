import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Cart, User } from "@ventionMachineCloudTest/models"

import { UsersService } from "./users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [],
})
export class UsersServiceModule {}
