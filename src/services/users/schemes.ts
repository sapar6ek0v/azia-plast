import { UsersProcessor } from "@/services/users/processor"
import { regExps } from "@/utils/regExps"
import { z } from "zod"

export const UserCreateSchema = z.object({
  username: z
    .string({ required_error: "Имя пользователя обязательно для заполнения!" })
    .trim()
    .min(3, "Имя пользователя должно сожержать хотя бы 3 символа!")
    .max(20, "Имя пользователя не должно превышать 20 символов!"),
  name: z
    .string({ required_error: "Имя обязательно для заполнения!" })
    .trim()
    .min(3, "Имя должно сожержать хотя бы 3 символа!")
    .max(20, "Имя не должно превышать 20 символов!"),
  surname: z
    .string({ required_error: "Фамилия обязательно для заполнения!" })
    .trim()
    .min(3, "Фамилия должно сожержать хотя бы 3 символа!")
    .max(20, "Фамилия не должна превышать 20 символов!"),
  patronymic: z
    .string({ required_error: "Отчество обязательно для заполнения!" })
    .trim()
    .min(3, "Отчество должно сожержать хотя бы 3 символа!")
    .max(20, "Отчество не должно превышать 20 символов!"),
  phoneNumber: z
    .string({ required_error: "Номер телефона обязательно для заполнения!" })
    .regex(regExps.phone, "Укажите номер телефона в правильном формате!")
    .trim()
    .transform((value) => (value ? UsersProcessor.formatPhoneNumberToBodyType(value) : null)),
  rolesId: z.array(z.number(), { message: "Выберите хотя бы одну роль!" }).min(1, "Выберите хотя бы одну роль!"),
})

export type UserCreateRequest = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = UserCreateSchema.extend({
  id: z.number({
    required_error: "Id пользователя обязателен для заполнения!",
  }),
})

export type UserUpdateRequest = z.infer<typeof UserUpdateSchema>

export const UserDeleteSchema = z.object({
  userId: z.number({ required_error: "Не передан id пользователя!" }),
})

export type UserDeleteRequest = z.infer<typeof UserDeleteSchema>
