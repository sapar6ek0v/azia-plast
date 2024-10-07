"use server"

import { ProductColorsApi } from "@/services/productColors/api"
import { ProductColorsProcessor } from "@/services/productColors/processor"
import {
  ProductColorCreateSchema,
  ProductColorDeleteSchema,
  ProductColorUpdateSchema,
} from "@/services/productColors/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getProductColors = async () => {
  const response = await ProductColorsApi.getAll()

  return ProductColorsProcessor.toPresenterList(response.data || [])
}

export const createProductColor = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = ProductColorCreateSchema.parse(formData)

  const response = await ProductColorsApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductColorsProcessor.getTag())
    return {
      ...response,
      message: `Цвет продукта ${response.data?.name} успешно создан`,
    }
  }

  return response
}

export const updateProductColor = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = ProductColorUpdateSchema.parse({
    ...formData,
    id: +formData.id,
  })

  const response = await ProductColorsApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductColorsProcessor.getTag())
    return { ...response, message: `Цвет продукта успешно обновлен` }
  }

  return response
}

export const deleteProductColor = async (
  prevData: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> => {
  const requestBody = ProductColorDeleteSchema.parse({
    id: Number(formData.get("id")),
  })

  const response = await ProductColorsApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductColorsProcessor.getTag())
    return { ...response, message: `Цвет продукта успешно удален` }
  }

  return response
}
