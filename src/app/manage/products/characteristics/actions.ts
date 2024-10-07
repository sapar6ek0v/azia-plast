"use server"

import { ProductCharacteristicsApi } from "@/services/productCharacteristics/api"
import { ProductCharacteristicProcessor } from "@/services/productCharacteristics/processor"
import {
  ProductCharacteristicCreateSchema,
  ProductCharacteristicDeleteSchema,
  ProductCharacteristicUpdateSchema,
} from "@/services/productCharacteristics/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getProductCharacteristics = async () => {
  const response = await ProductCharacteristicsApi.getAll()

  return ProductCharacteristicProcessor.toPresenterList(response.data || [])
}

export const createProductCharacteristic = async (
  prevData: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> => {
  const requestBody = ProductCharacteristicCreateSchema.parse({
    name: formData.get("name"),
  })

  const response = await ProductCharacteristicsApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductCharacteristicProcessor.getTag())
    return {
      ...response,
      message: `Характеристика продукта ${response.data?.name} успешно создано`,
    }
  }

  return response
}

export const updateProductCharacteristic = async (
  prevData: ServerActionState,
  data: FormData,
): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = ProductCharacteristicUpdateSchema.parse({
    ...formData,
    id: +formData.id,
  })

  const response = await ProductCharacteristicsApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductCharacteristicProcessor.getTag())
    return { ...response, message: `Характеристика продукта успешно обновлена` }
  }

  return response
}

export const deleteProductCharacteristic = async (
  prevData: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> => {
  const requestBody = ProductCharacteristicDeleteSchema.parse({
    id: Number(formData.get("id")),
  })

  const response = await ProductCharacteristicsApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(ProductCharacteristicProcessor.getTag())
    return { ...response, message: `Характеристика продукта успешно удалена` }
  }

  return response
}
