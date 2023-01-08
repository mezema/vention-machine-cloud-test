import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"

import { configuration } from "../config/configuration"
import { CartsModule } from "../endpoints/carts/carts.module"
import { HealthModule } from "../endpoints/health/health.module"
import { ProductsModule } from "../endpoints/products/products.module"
import { TodosModule } from "../endpoints/todos/todos.module"
import { UsersModule } from "../endpoints/users/users.module"
import { getRootModuleImports } from "../utils/utils"

@Module({
  imports: [
    ...getRootModuleImports(configuration),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/assets`,
      exclude: ["/api*"],
    }),
    HealthModule,
    TodosModule,
    UsersModule,
    CartsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
