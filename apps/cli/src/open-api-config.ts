import { ConfigFile } from "@rtk-query/codegen-openapi"

const reduxPath = "../../apps/webapp/src/redux"
const config: ConfigFile = {
  schemaFile: "http://localhost:3333/documentation/json",
  apiFile: `${reduxPath}/ventionMachineCloudTest-api.ts`,
  apiImport: "ventionMachineCloudTestApi",
  outputFiles: {
    [`${reduxPath}/endpoints/todos-endpoints.ts`]: { exportName: "todosApi", filterEndpoints: /todo/i },
  },
  filterEndpoints: [/todo/i],
  exportName: "ventionMachineCloudTestApi",
  hooks: true,
}

export default config
