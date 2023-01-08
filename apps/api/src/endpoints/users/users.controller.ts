import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { Crud } from "@nestjsx/crud"
import { User } from "@ventionMachineCloudTest/models"

import { UsersService } from "../../services/users.service"

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user)
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}
