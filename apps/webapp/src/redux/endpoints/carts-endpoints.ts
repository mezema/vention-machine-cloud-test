import { api } from "../api";
import { Cart, CartItem } from "@ventionMachineCloudTest/models";

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    createOneCart: build.mutation<CreateOneCartApiResponse, CreateOneCartApiArg>({
      query: queryArg => ({ url: `/api/carts`, method: "POST", body: queryArg.cart }),
    }),
    updateOneCart: build.mutation<UpdateOneCartApiResponse, UpdateOneCartApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}`, method: "PATCH", body: queryArg.cart }),
    }),
    deleteOneCart: build.mutation<DeleteOneCartApiResponse, DeleteOneCartApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}`, method: "DELETE" }),
    }),
    getManyCarts: build.query<GetManyCartsApiResponse, void>({
      query: () => ({ url: `/api/carts` }),
    }),
    getOneCart: build.query<GetOneCartApiResponse, GetOneCartApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}` }),
    }),
    removeCartItem: build.mutation<RemoveCartItemApiResponse, RemoveCartItemApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}/items/${queryArg.productId}`, method: "DELETE" }),
    }),
    addCartItem: build.mutation<AddCartItemApiResponse, AddCartItemApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}/items/${queryArg.productId}`, method: "POST" }),
    }),
    getCartItems: build.query<GetCartItemsApiResponse, GetCartItemsApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}/items` }),
    }),
    getCartItem: build.query<GetCartItemApiResponse, GetCartItemApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.id}/items/${queryArg.productId}`}),
    }),
    /*
    @Get(':cartId/items/:productId/exists')
    itemExists(@Param('cartId') cartId: number, @Param('productId') productId: number): Promise<boolean> {
        return this.cartsService.itemExists(cartId, productId);
    }
    */
    itemExists: build.query<ItemExistsApiResponse, ItemExistsApiArg>({
      query: queryArg => ({ url: `/api/carts/${queryArg.cartId}/items/${queryArg.productId}/exists` }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as cartsApi }

export type CreateOneCartApiResponse = /** status 201 Get create one base response */ Cart
export type CreateOneCartApiArg = {
  cart: Cart
}
export type UpdateOneCartApiResponse = /** status 200 Response */ Cart
export type UpdateOneCartApiArg = {
  id: number
  cart: Cart
}
export type DeleteOneCartApiResponse = unknown
export type DeleteOneCartApiArg = {
  id: number
}

export type RemoveCartItemApiResponse = unknown
export type RemoveCartItemApiArg = {
  id: number
  productId: number
}
export type AddCartItemApiResponse = /** status 201 Response */ CartItem
export type AddCartItemApiArg = {
  id: number
  productId: number
}
export type GetManyCartsApiResponse = /** status 200 Response */ Cart[]
export type GetManyCartsApiArg = {
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

export type GetOneCartApiResponse = /** status 200 Response */ Cart
export type GetOneCartApiArg = {
  id: number
}

export type GetCartItemsApiResponse = /** status 200 Response */ CartItem[]
export type GetCartItemsApiArg = {
  id: number
}

export type GetCartItemApiResponse = /** status 200 Response */ CartItem
export type GetCartItemApiArg = {
  id: number
  productId: number
}

export type ItemExistsApiResponse = /** status 200 Response */ boolean
export type ItemExistsApiArg = {
  cartId: number
  productId: number
}

export const { useAddCartItemMutation, useGetCartItemsQuery, useGetCartItemQuery, useRemoveCartItemMutation, useGetManyCartsQuery, useCreateOneCartMutation, useUpdateOneCartMutation, useDeleteOneCartMutation,  useGetOneCartQuery, useItemExistsQuery } = injectedRtkApi