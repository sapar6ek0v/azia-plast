import { z } from "zod"

export const ProductCharacteristicCreateSchema = z.object({
  name: z
    .string({ required_error: "Название обезательно для заполнения!" })
    .trim()
    .min(1, "Название должно содержать хотя бы 1 символ!"),
})

export type ProductCharacteristicCreateRequest = z.infer<typeof ProductCharacteristicCreateSchema>

export const ProductCharacteristicUpdateSchema = ProductCharacteristicCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type ProductCharacteristicUpdateRequest = z.infer<typeof ProductCharacteristicUpdateSchema>

export const ProductCharacteristicDeleteSchema = ProductCharacteristicUpdateSchema.pick({ id: true })

export type ProductCharacteristicDeleteRequest = z.infer<typeof ProductCharacteristicDeleteSchema>
