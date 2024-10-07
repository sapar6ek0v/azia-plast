import { z } from "zod"

export const RoleCreateSchema = z.object({
  role: z
    .string({ required_error: "Роль обезательно для заполнения!" })
    .trim()
    .min(1, "Роль должно содержать хотя бы 1 символ!"),
})

export type RoleCreateRequest = z.infer<typeof RoleCreateSchema>

export const RoleUpdateSchema = RoleCreateSchema.extend({
  id: z.number({ required_error: "Id обязателен для заполнения!" }),
})

export type RoleUpdateRequest = z.infer<typeof RoleUpdateSchema>

export const RoleDeleteSchema = RoleUpdateSchema.pick({ id: true })

export type RoleDeleteRequest = z.infer<typeof RoleDeleteSchema>
