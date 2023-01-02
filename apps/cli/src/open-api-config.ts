import { ConfigFile } from "@rtk-query/codegen-openapi"

const reduxPath = "../../apps/webapp/src/redux"
const config: ConfigFile = {
  schemaFile: "http://localhost:3333/documentation/json",
  apiFile: `${reduxPath}/ventionMachineCloudTest-api.ts`,
  apiImport: "ventionMachineCloudTestApi",
  outputFiles: {
    [`${reduxPath}/endpoints/todos-endpoints.ts`]: { exportName: "todosApi", filterEndpoints: /todos/i },
    [`${reduxPath}/endpoints/users-endpoints.ts`]: { exportName: "usersApi", filterEndpoints: /users/i },
    [`${reduxPath}/endpoints/carts-endpoints.ts`]: { exportName: "cartsApi", filterEndpoints: /carts/i },
    [`${reduxPath}/endpoints/products-endpoints.ts`]: { exportName: "productsApi", filterEndpoints: /products/i },
  },
  filterEndpoints: /todos|user|cart|product/i,
  exportName: "ventionMachineCloudTestApi",
  hooks: true,
}

export default config
