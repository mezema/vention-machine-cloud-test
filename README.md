<div align="center">
  <h1>Vention Machine Cloud Test</h1>
</div>
<div align="center">
  <strong>Simple application for a marketplace.</strong>
</div>
</br>

## 💥 Getting Started

### Prerequisites

- [Docker Compose](https://docs.docker.com/compose/install/)
- [node.js](https://nodejs.org/en/download/) v14.x

## 🚀 Quick Start

### Run the application

Run the whole stack with one command:

```
npm run start-local
```

View application at - http://localhost:4200/

Alternatively you can run the whole stack using these commands

First, install the dependencies:

```
npm i
```

Then:

```
npm run postgres
```

```
npm start api
```

```
npm start webapp
```

</br>



</br>

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Demo Application](#-demo-application)
  - [Technical Stack](#technical-stack)
- [Implementation](#%EF%B8%8F-implementation)
  - [Overview of Implemented Features](#-overview-of-implemented-features)
  - [Data Model](#-data-model)
  - [Things to be improved](#-things-to-be-improved)
  - [Database](#database)
    - [Postgres](#postgres)
    - [Data seeding](#data-seeding)
  - [Backend](#backend)
  - [Frontend](#frontend)

</br>

## 📚 About the Project

A very simple application which represents a marketplace.<br/>

## Requirements

- [*] An application using React that will display a list of items that you can add to your cart
- [*] When you add an item to your cart it should be represented in the UI
- [*] You should be able to remove products from the cart
- [*] You must add the ability to rate products with a score from (1 to 5)
- [*] Provide instructions in the README to launch the application

## Bonus points

- [*] **Use TypeScript**
- [*] Implement a backend and persist the state in a database
- [*] Have a single command to launch the whole application
- [*] Use the open-source project [stator](https://github.com/chocolat-chaud-io/stator) as a template for your application.

</br>

### Technical Stack

For a detailed list of all those technologies, you can read this [blog article](https://yann510.hashnode.dev/ventionMachineCloudTest-a-full-stack-template-releases-deployments-enforced-conVentions-ckhmnyhr903us9ms1b20lgi3b).

| Deployment                                                                       | Database                                         | Backend                                       | Frontend                                                      | Testing                                          | ConVentions                                                        |
| -------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/) | [Postgres](https://github.com/postgres/postgres) | [Nest](https://github.com/nestjs/nest)        | [React](https://github.com/facebook/react)                    | [jest](https://github.com/facebook/jest)         | [commitlint](https://github.com/conVentional-changelog/commitlint) |
| [semantic-release](https://github.com/semantic-release/semantic-release)         | [Mongo](https://github.com/mongodb/mongo)        | [Fastify](https://github.com/fastify/fastify) | [React Router](https://github.com/ReactTraining/react-router) | [cypress](https://github.com/cypress-io/cypress) | [eslint](https://github.com/eslint/eslint)                         |
| [docker-compose](https://github.com/docker/compose)                              | [TypeORM](https://github.com/typeorm/typeorm)    | [Swagger](https://github.com/nestjs/swagger)  | [Redux](https://github.com/reduxjs/redux)                     |                                                  | [prettier](https://github.com/prettier/prettier)                   |
|                                                                                  | [NestJs CRUD](https://github.com/nestjsx/crud)   | [ReDoc](https://github.com/Redocly/redoc)     | [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)     |                                                  |                                                                    |
|                                                                                  |                                                  |                                               | [Material UI](https://github.com/mui-org/material-ui)         |                                                  |                                                                    |

</br>


## ⚙️ Implementation

### Overview of implemented features

- A marketplace page where users can view a list of products and their details.
- A system for handling carts and cart items, allowing users to add products to their cart and view the items in their cart.
- A navigation bar with a shopping cart icon that displays the number of items in the user's cart, and allows the user to view items in the cart.
- A system for handling ratings and reviews, allowing users to rate products and submit their rating for a product.
- A landing page that is displayed to users who have not yet created a cart. This page includes a "Get Started" button that allows users to create a new cart and seed the application with some initial products.

</br>

### Data Model

Cart
```
id: number
user: User
cartItems: CartItem[]
```

Product
```
id: number
name: string
imageUrl: string
ratings: Rating[]
price: number
cartItems: CartItem[]
```

CartItem
```
id: number
quantity: number
cart: Cart
product: Product
```

Rating
```
id: number
rating: number
product: Product
```

</br>

### Things to be improved/Upcoming features

- Add user authentication and authorization to secure api resources.
- Add pagination to the marketplace page so that users can browse through more products.
- Allow users to sort products based on different criteria (e.g. price, name, rating).
- Allow users to search for products by keyword.
- Add order entity to manage and represent purchases.
- Allow users to view the average rating of a product, as well as the individual ratings that have been submitted.
- Improve the design and user experience of the application by adding more visual elements and making the layout more intuitive.
- Add the ability for users to leave reviews for products in addition to just rating them.
- Add the ability for administrators to add, update, and delete products from the marketplace.

</br>

### Database

#### Postgres

There are 2 databases available, postgres and mongo.
To ensure your developers don't get into any trouble while installing those, they are already pre-configured with `docker-compose.yml` files.

**By default, the project uses postgres.**
If this is what you want, you're good to go; everything will work out of the box.

#### Migrations

By default, the automatic synchronization is activated between your models and the database.
This means that making changes on your models will be automatically reflected on your database schemas.
If you would like to control your migrations manually, you can do so by setting `synchronize` to false in `orm-config.ts` file.

Generate migration from your modified schemas:

```
npm run typeorm -- migration:generate -n {MIGRATION_NAME}
```

This will check the difference between models for your defined entities and your database schemas.
If it finds changes, it will generate the appropriate migration scripts.

Run all pending migrations:

```
npm run typeorm -- migration:run
```

To get all the information on migrations, consult [typeorm documentation](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md).

#### Data seeding

If you want your database to be pre-populated with that, it is very easy to do so.
For postgres add your `sql` statements to `apps/database/postgres/init.sql` file.

### Backend

To communicate with the database, we make use of [typeorm](https://github.com/typeorm/typeorm).

To serve API requests, we make use of [nest](https://github.com/nestjs/nest) alongside with [fastify](https://github.com/fastify/fastify) to ensure blazing fast [performance](https://github.com/fastify/fastify#benchmarks).

To reduce the boilerplate commonly found around creating a new entity, we are using the [nestjsx/crud](https://github.com/nestjsx/crud) plugin that will generate all necessary routes for CRUD operations.

### Frontend

For our webapp, we're using [react](https://github.com/facebook/react) alongside [redux-toolkit](https://github.com/reduxjs/redux-toolkit) and [react-router](https://github.com/ReactTraining/react-router).
