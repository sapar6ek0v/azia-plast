"use server"

import { RolesApi } from "@/services/roles/api"
import { RolesProcessor } from "@/services/roles/processor"
import { RoleCreateSchema, RoleDeleteSchema, RoleUpdateSchema } from "@/services/roles/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { revalidateTag } from "next/cache"

export const getRoles = async () => {
  const { data } = await RolesApi.getAll()

  return RolesProcessor.toPresenterList(data || [])
}

export const createRole = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = RoleCreateSchema.parse({
    role: formData.get("role"),
  })

  const response = await RolesApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(RolesProcessor.getTag())
    return {
      ...response,
      message: `Роль ${response.data?.role} успешно создано`,
    }
  }

  return response
}

export const updateRole = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = RoleUpdateSchema.parse({
    id: Number(formData.get("id")),
    role: formData.get("role"),
  })

  const response = await RolesApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(RolesProcessor.getTag())
    return { ...response, message: `Роль успешно обновлена` }
  }

  return response
}

export const deleteRole = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = RoleDeleteSchema.parse({ id: Number(formData.get("id")) })

  const response = await RolesApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(RolesProcessor.getTag())
    return { ...response, message: `Роль успешно удалена` }
  }

  return response
}
