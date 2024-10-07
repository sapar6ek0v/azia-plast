"use server"

import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { UsersApi } from "@/services/users/api"
import { UsersProcessor } from "@/services/users/processor"
import { UserCreateSchema, UserDeleteSchema, UserUpdateSchema } from "@/services/users/schemes"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getUsers = async () => {
  const { data } = await UsersApi.getAll()

  return UsersProcessor.toPresenterList(data || [])
}

export const createUser = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = UserCreateSchema.parse(formData)

  const response = await UsersApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(UsersProcessor.getTag())
    return {
      ...response,
      message: `Пользователь ${response.data?.username} успешно создан`,
    }
  }

  return response
}

export const updateUser = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = UserUpdateSchema.parse({
    ...formData,
    id: +formData.id,
  })

  const response = await UsersApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(UsersProcessor.getTag())
    return { ...response, message: `Пользователь успешно обновлен` }
  }

  return response
}

export const deleteUser = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = UserDeleteSchema.parse({
    userId: Number(formData.get("id")),
  })

  const response = await UsersApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(UsersProcessor.getTag())
    return { ...response, message: `Пользователь успешно удален` }
  }

  return response
}
