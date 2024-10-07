"use server"

import { NewsApi } from "@/services/news/api"
import { NewsProcessor } from "@/services/news/processor"
import { NewsCreateSchema, NewsDeleteSchema, NewsToggleActivitySchema, NewsUpdateSchema } from "@/services/news/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getNews = async () => {
  const { data } = await NewsApi.getAll()

  return NewsProcessor.toPresenterList(data || [])
}

export const createNews = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = NewsCreateSchema.parse(formData)

  const response = await NewsApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(NewsProcessor.getTag())
    return {
      ...response,
      message: `Новость ${response.data?.title} успешно создано`,
    }
  }

  return response
}

export const updateNews = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = NewsUpdateSchema.parse({ ...formData, id: Number(data.get("id")) })

  const response = await NewsApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(NewsProcessor.getTag())
    return { ...response, message: "Новость успешно обновлена" }
  }

  return response
}

export const toggleNewsActivity = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = NewsToggleActivitySchema.parse({
    noticeId: formData.id,
    isActive: formData.checked,
  })

  const response = await NewsApi.toggleActivity(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(NewsProcessor.getTag())
    return { ...response, message: `Новость успешно ${requestBody.isActive ? "активировано" : "деактивировано"}` }
  }

  return response
}

export const deleteNews = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = NewsDeleteSchema.parse({ id: Number(formData.get("id")) })

  const response = await NewsApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(NewsProcessor.getTag())
    return { ...response, message: `Новость успешно удалена` }
  }

  return response
}
