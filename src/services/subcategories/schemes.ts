import { z } from "zod"

export const SubcategoryCreateSchema = z.object({
  categoryId: z.number({ required_error: "Выберите категорию!" }),
  name: z
    .string({ required_error: "Название обезательно для заполнения!" })
    .trim()
    .min(1, "Название должно содержать хотя бы 1 символ!"),
  subcategoryImage: z.any().refine((val) => val && "Выберите изображения!"),
})

export type SubcategoryCreateRequest = z.infer<typeof SubcategoryCreateSchema>

export const SubcategoryUpdateSchema = SubcategoryCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type SubcategoryUpdateRequest = z.infer<typeof SubcategoryUpdateSchema>

export const SubcategoryDeleteSchema = SubcategoryUpdateSchema.pick({
  id: true,
})

export type SubCategoryDeleteRequest = z.infer<typeof SubcategoryDeleteSchema>
