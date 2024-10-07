"use server"

import { CategoriesApi } from "@/services/categories/api"
import { CategoriesProcessor } from "@/services/categories/processor"
import { CategoryCreateSchema, CategoryDeleteSchema, CategoryUpdateSchema } from "@/services/categories/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { revalidateTag } from "next/cache"

export const getCategories = async () => {
  const { data } = await CategoriesApi.getAll()

  return CategoriesProcessor.toPresenterList(data || [])
}

export const createCategory = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = Object.fromEntries(data)
  const requestBody = CategoryCreateSchema.parse(formData)

  const response = await CategoriesApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(CategoriesProcessor.getTag())
    return {
      ...response,
      message: `Категория ${response.data?.name} успешно создано`,
    }
  }

  return response
}

export const updateCategory = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = Object.fromEntries(data)
  const requestBody = CategoryUpdateSchema.parse(formData)

  const response = await CategoriesApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(CategoriesProcessor.getTag())
    return { ...response, message: `Категория успешно обновлена` }
  }

  return response
}

export const deleteCategory = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = Object.fromEntries(data)
  const requestBody = CategoryDeleteSchema.parse(formData)

  const response = await CategoriesApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(CategoriesProcessor.getTag())
    return { ...response, message: `Категория успешно удалена` }
  }

  return response
}
