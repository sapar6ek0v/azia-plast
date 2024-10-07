"use server"

import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { VacanciesApi } from "@/services/vacancies/api"
import { VacanciesProcessor } from "@/services/vacancies/processor"
import { VacancyCreateSchema, VacancyDeleteSchema, VacancyUpdateSchema } from "@/services/vacancies/schemes"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getVacancies = async () => {
  const { data } = await VacanciesApi.getAll()

  return VacanciesProcessor.toPresenterList(data || [])
}

export const createVacancy = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = VacancyCreateSchema.parse(formData)

  const response = await VacanciesApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(VacanciesProcessor.getTag())
    return {
      ...response,
      message: `Вакансия ${response.data?.name} успешно создано`,
    }
  }

  return response
}

export const updateVacancy = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = VacancyUpdateSchema.parse({ ...formData, id: +formData.id })

  const response = await VacanciesApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(VacanciesProcessor.getTag())
    return { ...response, message: "Вакансия успешно обновлена" }
  }

  return response
}

export const deleteVacancy = async (prevData: ServerActionState, formData: FormData): Promise<ServerActionState> => {
  const requestBody = VacancyDeleteSchema.parse({ id: Number(formData.get("id")) })

  const response = await VacanciesApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(VacanciesProcessor.getTag())
    return { ...response, message: "Вакансия успешно удалена" }
  }

  return response
}
