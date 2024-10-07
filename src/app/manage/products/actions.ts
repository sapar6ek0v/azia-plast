"use server"

import { ProductsApi } from "@/services/products/api"
import { ProductsProcessor } from "@/services/products/processor"
import { ProductCreateSchema, ProductDeleteSchema, ProductUpdateSchema } from "@/services/products/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getProducts = async () => {
  const { data } = await ProductsApi.getAll()

  return ProductsProcessor.toPresenterList(data || [])
}

export const createProducts = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = ProductCreateSchema.parse(formData)

  const response = await ProductsApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductsProcessor.getTag())
    return {
      ...response,
      message: `Новость ${response.data?.title} успешно создано`,
    }
  }

  return response
}

export const updateProducts = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = ProductUpdateSchema.parse({ ...formData, id: Number(data.get("id")) })

  const response = await ProductsApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductsProcessor.getTag())
    return { ...response, message: "Новость успешно обновлена" }
  }

  return response
}

export const deleteProducts = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = ProductDeleteSchema.parse({ id: Number(formData.get("id")) })

  const response = await ProductsApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductsProcessor.getTag())
    return { ...response, message: `Новость успешно удалена` }
  }

  return response
}
