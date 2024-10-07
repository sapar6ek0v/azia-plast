import { z } from "zod"

export const CertificateCreateSchema = z.object({
  name: z
    .string({ required_error: "Название обезательно для заполнения!" })
    .trim()
    .min(1, "Название должно содержать хотя бы 1 символ!"),
  description: z
    .string({ required_error: "Описание обезательно для заполнения!" })
    .trim()
    .min(1, "Описание должно содержать хотя бы 1 символ!"),
  certificateImage: z.any().refine((val) => val && "Выберите изображения!"),
})

export type CertificateCreateRequest = z.infer<typeof CertificateCreateSchema>

export const CertificateUpdateSchema = CertificateCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type CertificateUpdateRequest = z.infer<typeof CertificateUpdateSchema>

export const CertificateDeleteSchema = CertificateUpdateSchema.pick({ id: true })

export type CertificateDeleteRequest = z.infer<typeof CertificateDeleteSchema>
