import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "@ventionMachineCloudTest/models"
import { Cart } from "@ventionMachineCloudTest/models"
import { Repository } from "typeorm"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async create(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user)
    const cart = new Cart()
    cart.user = newUser
    await this.cartsRepository.save(cart)

    return newUser
  }

  async update(id: string, user: User): Promise<User> {
    await this.usersRepository.update(id, user)

    return this.usersRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
