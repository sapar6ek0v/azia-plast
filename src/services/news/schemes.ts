import { z } from "zod"

export const NewsCreateSchema = z.object({
  title: z
    .string({ required_error: "Заголовок обезательно для заполнения!" })
    .trim()
    .min(1, "Заголовок должно содержать хотя бы 1 символ!"),
  description: z
    .string({ required_error: "Описание обезательно для заполнения!" })
    .trim()
    .min(1, "Описание должно содержать хотя бы 1 символ!"),
  noticeImage: z.any().refine((val) => val && "Выберите изображения!"),
})

export type NewsCreateRequest = z.infer<typeof NewsCreateSchema>

export const NewsUpdateSchema = NewsCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type NewsUpdateRequest = z.infer<typeof NewsUpdateSchema>

export const NewsToggleActivitySchema = z.object({
  noticeId: z.number({ required_error: "Id обязателен для заполнения!" }),
  isActive: z.boolean({ required_error: "Выберите активность!" }),
})

export type NewsToggleActivityRequest = z.infer<typeof NewsToggleActivitySchema>

export const NewsDeleteSchema = NewsUpdateSchema.pick({ id: true })

export type NewsDeleteRequest = z.infer<typeof NewsDeleteSchema>
