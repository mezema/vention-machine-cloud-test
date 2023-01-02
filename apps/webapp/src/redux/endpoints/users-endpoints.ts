import { api } from "../api"
import { Cart, User } from "@ventionMachineCloudTest/models"
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getManyUsers: build.query<GetManyUserResponseDto, GetManyUserRequestDto>({
        query: (body) => ({
            url: `/api/users`,
            method: "GET",
            params: body
        })
    }),
    getOneUser: build.query<GetOneUserResponseDto, GetOneUserRequestDto>({
        query: (body) => ({
            url: `/api/users/${body.id}`,
            method: "GET",
            params: body
        })
    }),
    createOneUser: build.mutation<CreateOneUserResponseDto, CreateOneUserRequestDto>({
        query: (body) => ({
            url: `/api/users`,
            method: "POST",
            body
        })
    }),
    updateOneUser: build.mutation<UpdateOneUserResponseDto, UpdateOneUserRequestDto>({
        query: (body) => ({
            url: `/api/users/${body.id}`,
            method: "PUT",
            body
        })
    }),
    deleteOneUser: build.mutation<DeleteOneUserResponseDto, DeleteOneUserRequestDto>({
        query: (body) => ({
            url: `/api/users/${body.id}`,
            method: "DELETE",
            params: body
        })
    })
    }),
    overrideExisting: false
})

export { injectedRtkApi as usersApi }

export type GetManyUserResponseDto = User[]
export type GetManyUserRequestDto = {
    limit?: number
    offset?: number
}
export type GetOneUserResponseDto = User
export type GetOneUserRequestDto = {
    id: string
}
export type CreateOneUserResponseDto = User
export type CreateOneUserRequestDto = User
export type UpdateOneUserResponseDto = User
export type UpdateOneUserRequestDto = User & {
    id: string
}
export type DeleteOneUserResponseDto = User
export type DeleteOneUserRequestDto = {
    id: string
}

export const {
    useGetManyUsersQuery,
    useGetOneUserQuery,
    useCreateOneUserMutation,
    useUpdateOneUserMutation,
    useDeleteOneUserMutation
} = injectedRtkApi