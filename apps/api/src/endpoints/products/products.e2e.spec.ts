import { Product } from "@ventionMachineCloudTest/models"
import * as supertest from "supertest"
import { Repository } from "typeorm"

import { TestingHelper } from "../../utils/test"
import { ProductsModule } from "./products.module"

describe("Products", () => {
  let testingHelper: TestingHelper
  let repository: Repository<Product>

  beforeAll(async () => {
    testingHelper = await new TestingHelper().initializeModuleAndApp("Products", [ProductsModule])

    repository = testingHelper.module.get("ProductRepository")
    await testingHelper.reloadFixtures();
  })

  afterAll(() => testingHelper.shutdownServer())

  describe("GET /products", () => {
    it("should return an array of products", async () => {
      const { body } = await supertest
        .agent(testingHelper.app.getHttpServer())
        .get("/products")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)

      expect(body).toMatchObject([
        { id: expect.any(Number), name: "test-name-0", price: 2, imageUrl: "test image 0",  __ratings__: [] },
        { id: expect.any(Number), name: "test-name-1", price: 1, imageUrl: "test image 1", __ratings__: [] },
      ])
    })

    it("should create one product", async () => {
      const product = { name: "test-name-0", price: 2, imageUrl: "test image 0" }

      const { body } = await supertest
        .agent(testingHelper.app.getHttpServer())
        .post("/products")
        .send(product)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)

      expect(body).toMatchObject({ id: expect.any(Number), name: "test-name-0", price: 2, imageUrl: "test image 0" })
    })

    it("should delete one product", async () => {
      await supertest.agent(testingHelper.app.getHttpServer()).delete(`/products/1`).set("Accept", "application/json").expect(200)
      const missingProduct = await repository.findOne({ id: 1 })

      expect(missingProduct).toBe(undefined)
    })
  })
})

