import { api } from "../api"
import { Product } from "@ventionMachineCloudTest/models"
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getManyProducts: build.query<GetManyProductsApiResponse, GetManyProductsApiArg>({
      query: queryArg => ({
        url: `/api/products`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache,
        },
      }),
    }),
    createOneProduct: build.mutation<CreateOneProductApiResponse, CreateOneProductApiArg>({
      query: queryArg => ({ url: `/api/products`, method: "POST", body: queryArg.product }),
    }),
    updateOneProduct: build.mutation<UpdateOneProductApiResponse, UpdateOneProductApiArg>({
      query: queryArg => ({ url: `/api/products/${queryArg.id}`, method: "PATCH", body: queryArg.product }),
    }),
    deleteOneProduct: build.mutation<DeleteOneProductApiResponse, DeleteOneProductApiArg>({
      query: queryArg => ({ url: `/api/products/${queryArg.id}`, method: "DELETE" }),
    }),
    seedProducts: build.query<SeedProductsApiResponse, void>({
      query: queryArg => ({ url: `/api/products/seed`, method: "GET" }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as productsApi }

export type GetManyProductsApiResponse = /** status 200 Get many base response */ Product[]
export type GetManyProductsApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[]
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[]
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[]
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[]
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[]
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number
}
export type CreateOneProductApiResponse = /** status 201 Get create one base response */ Product
export type CreateOneProductApiArg = {
  product: Product
}
export type UpdateOneProductApiResponse = /** status 200 Response */ Product
export type UpdateOneProductApiArg = {
  id: number
  product: Product
}
export type DeleteOneProductApiResponse = unknown
export type DeleteOneProductApiArg = {
  id: number
}

export type SeedProductsApiResponse = string

export type GetManyProductResponseDto = {
  data: Product[]
  count: number
  total: number
  page: number
  pageCount: number
}
export const { useGetManyProductsQuery, useCreateOneProductMutation, useUpdateOneProductMutation, useDeleteOneProductMutation, useSeedProductsQuery } = injectedRtkApi
