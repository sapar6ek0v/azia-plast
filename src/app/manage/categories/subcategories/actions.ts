"use server"

import { SubcategoriesApi } from "@/services/subcategories/api"
import { SubcategoriesProcessor } from "@/services/subcategories/processor"
import {
  SubcategoryCreateSchema,
  SubcategoryDeleteSchema,
  SubcategoryUpdateSchema,
} from "@/services/subcategories/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getSubcategories = async () => {
  const { data } = await SubcategoriesApi.getAll()

  return data
  // return SubcategoriesProcessor.toPresenterList(data || [])
}

export const createSubcategory = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  // TODO: change categoryId to number
  const requestBody = SubcategoryCreateSchema.parse({ ...formData, categoryId: +formData.categoryId })

  const response = await SubcategoriesApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(SubcategoriesProcessor.getTag())
    return {
      ...response,
      message: `Подкатегория ${response.data?.name} успешно создано`,
    }
  }

  return response
}

export const updateSubcategory = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = SubcategoryUpdateSchema.parse(formData)

  const response = await SubcategoriesApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(SubcategoriesProcessor.getTag())
    return { ...response, message: `Подкатегория успешно обновлена` }
  }

  return response
}

export const deleteSubcategory = async (
  prevData: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> => {
  const requestBody = SubcategoryDeleteSchema.parse({ id: Number(formData.get("id")) })

  const response = await SubcategoriesApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(SubcategoriesProcessor.getTag())
    return { ...response, message: `Подкатегория успешно удалена` }
  }

  return response
}
