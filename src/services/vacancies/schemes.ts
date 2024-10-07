import { z } from "zod"

export const VacancyCreateSchema = z.object({
  name: z
    .string({ required_error: "Название обезательно для заполнения!" })
    .trim()
    .min(1, "Название должно содержать хотя бы 1 символ!"),
  description: z
    .string({ required_error: "Описание обезательно для заполнения!" })
    .trim()
    .min(1, "Описание должно содержать хотя бы 1 символ!"),
  offer: z
    .string({ required_error: "Предложение обезательно для заполнения!" })
    .trim()
    .min(1, "Предложение должно содержать хотя бы 1 символ!"),
})

export type VacancyCreateRequest = z.infer<typeof VacancyCreateSchema>

export const VacancyUpdateSchema = VacancyCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type VacancyUpdateRequest = z.infer<typeof VacancyUpdateSchema>

export const VacancyDeleteSchema = VacancyUpdateSchema.pick({ id: true })

export type VacancyDeleteRequest = z.infer<typeof VacancyDeleteSchema>
