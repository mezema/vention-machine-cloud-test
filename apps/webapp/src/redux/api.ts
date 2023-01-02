import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { environment } from "../environments/environment"

export const apiTagTypes = { todo: "todo", cart: "cart", product: "product", user: "user" }

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: environment.apiUrl.replace("/api", "") }),
  tagTypes: Object.values(apiTagTypes),
  endpoints: () => ({}),
})
