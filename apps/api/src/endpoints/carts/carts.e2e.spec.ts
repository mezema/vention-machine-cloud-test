import { Cart } from "@ventionMachineCloudTest/models"
import * as supertest from "supertest"
import { Repository } from "typeorm"

import { TestingHelper } from "../../utils/test"
import { CartsModule } from "./carts.module"

describe('Carts', () => {
  let testingHelper: TestingHelper
  let repository: Repository<Cart>

  beforeAll(async () => {
    testingHelper = await new TestingHelper().initializeModuleAndApp("carts", [CartsModule])

    repository = testingHelper.module.get("CartRepository")
    await testingHelper.reloadFixtures();
  })

  afterAll(() => testingHelper.shutdownServer())

  describe("GET /carts", () => {
    it("should return an array of carts", async () => {
      const { body } = await supertest
        .agent(testingHelper.app.getHttpServer())
        .get("/carts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
      
      expect(body).toMatchObject([
        { id: expect.any(Number), __user__: expect.any(Object), __cartItems__: expect.any(Array) },
        { id: expect.any(Number), __user__: expect.any(Object), __cartItems__: expect.any(Array) },
      ])
    })

    it("should create one cart", async () => {
      const cart = new Cart();

      const { body } = await supertest
        .agent(testingHelper.app.getHttpServer())
        .post("/carts")
        .send(cart)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)

      expect(body).toMatchObject({ id: expect.any(Number)})
    })

    it("should delete one cart", async () => {
      await supertest.agent(testingHelper.app.getHttpServer()).delete(`/carts/1`).set("Accept", "application/json").expect(200)
      const missingCart = await repository.findOne({ id: 1 })

      expect(missingCart).toBe(undefined)
    })
  })
})

