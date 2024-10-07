import { z } from "zod"

export const CategoryCreateSchema = z.object({
  name: z
    .string({ required_error: "Название обезательно для заполнения!" })
    .trim()
    .min(1, "Название должно содержать хотя бы 1 символ!"),
  multipartFile: z.any().refine((val) => val && "Выберите изображения!"),
})

export type CategoryCreateRequest = z.infer<typeof CategoryCreateSchema>

export const CategoryUpdateSchema = CategoryCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type CategoryUpdateRequest = z.infer<typeof CategoryUpdateSchema>

export const CategoryDeleteSchema = CategoryUpdateSchema.pick({ id: true })

export type CategoryDeleteRequest = z.infer<typeof CategoryDeleteSchema>
