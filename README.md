<div align="center">
  <h1>ventionMachineCloudTest</h1>
</div>
<div align="center">
  <strong>ventionMachineCloudTest, Simple application for a marketplace.</strong>
</div>
</br>

## 🚀 Quick Start

The interactive CLI will guide you to easily setup your project.

```
npm run get-started
```

</br>

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Demo Application](#-demo-application)
  - [Technical Stack](#technical-stack)
- [Implementation](#%EF%B8%8F-implementation)
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
- [ ] Have a single command to launch the whole application
- [*] Use the open-source project [stator](https://github.com/chocolat-chaud-io/stator) as a template for your applicationc.

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

## 💥 Getting Started

### Prerequisites

- [Docker Compose](https://docs.docker.com/compose/install/)
- [node.js](https://nodejs.org/en/download/) v14.x

### Run the application

First, install the dependencies:

```
npm i
```

Then, run the whole stack:

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

## ⚙️ Implementation

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
