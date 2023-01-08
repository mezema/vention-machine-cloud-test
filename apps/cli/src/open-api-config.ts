import { ConfigFile } from "@rtk-query/codegen-openapi"

const reduxPath = "../../apps/webapp/src/redux"
const config: ConfigFile = {
  schemaFile: "http://localhost:3333/documentation/json",
  apiFile: `${reduxPath}/ventionMachineCloudTest-api.ts`,
  apiImport: "ventionMachineCloudTestApi",
  outputFiles: {
    [`${reduxPath}/endpoints/todos-endpoints.ts`]: { exportName: "todosApi", filterEndpoints: /todo/i },
    [`${reduxPath}/endpoints/users-endpoints.ts`]: { exportName: "usersApi", filterEndpoints: /user/i },
    [`${reduxPath}/endpoints/carts-endpoints.ts`]: { exportName: "cartsApi", filterEndpoints: /cart/i },
    [`${reduxPath}/endpoints/products-endpoints.ts`]: { exportName: "productsApi", filterEndpoints: /product/i },
  },
  filterEndpoints: /todo|user|cart|product/i,
  exportName: "ventionMachineCloudTestApi",
  hooks: true,
}

export default config
