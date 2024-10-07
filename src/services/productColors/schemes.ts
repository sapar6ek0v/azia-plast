import { z } from "zod"

export const ProductColorCreateSchema = z.object({
  name: z
    .string({ required_error: "Название обязательно для заполнения!" })
    .trim()
    .min(1, "Название должно содержать хотя бы 1 символ!"),
  hexCode: z.string({ required_error: "Выберите цвет!" }).trim().min(1, "Выберите цвет"),
})

export type ProductColorCreateRequest = z.infer<typeof ProductColorCreateSchema>

export const ProductColorUpdateSchema = ProductColorCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type ProductColorUpdateRequest = z.infer<typeof ProductColorUpdateSchema>

export const ProductColorDeleteSchema = ProductColorUpdateSchema.pick({
  id: true,
})

export type ProductColorDeleteRequest = z.infer<typeof ProductColorDeleteSchema>
