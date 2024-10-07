"use server"

import { CertificatesApi } from "@/services/certificates/api"
import { CertificatesProcessor } from "@/services/certificates/processor"
import {
  CertificateCreateSchema,
  CertificateDeleteSchema,
  CertificateUpdateSchema,
} from "@/services/certificates/schemes"
import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { fromFormData } from "@/utils/formData"
import { revalidateTag } from "next/cache"

export const getCertificates = async () => {
  const { data } = await CertificatesApi.getAll()

  return CertificatesProcessor.toPresenterList(data || [])
}

export const createCertificate = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  console.log({ formData })
  const requestBody = CertificateCreateSchema.parse(formData)
  const response = await CertificatesApi.create(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(CertificatesProcessor.getTag())
    return {
      ...response,
      message: `Сертификат ${response.data?.name} успешно создан`,
    }
  }

  return response
}

export const updateCertificate = async (prevData: ServerActionState, data: FormData): Promise<ServerActionState> => {
  const formData = fromFormData(data)
  const requestBody = CertificateUpdateSchema.parse({ ...formData, id: +formData.id })

  const response = await CertificatesApi.update(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(CertificatesProcessor.getTag())
    return { ...response, message: `Сертификат успешно обновлен` }
  }

  return response
}

export const deleteCertificate = async (
  prevData: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> => {
  const requestBody = CertificateDeleteSchema.parse({ id: Number(formData.get("id")) })

  const response = await CertificatesApi.delete(requestBody)

  if (response.state === CustomResponseStatus.SUCCESS) {
    revalidateTag(CertificatesProcessor.getTag())
    return { ...response, message: `Сертификат успешно удален` }
  }

  return response
}
