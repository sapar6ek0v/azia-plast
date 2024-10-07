import { regExps } from "@/utils/regExps"
import * as yup from "yup"

export const AuthSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(1, "Имя пользователя должно содержать хотя бы 1 символ")
    .required("Имя пользователя обязательно для заполнения!"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов!")
    .required("Пароль обязателен для заполнения!"),
})

export type AuthRequest = yup.InferType<typeof AuthSchema>

export const AuthPasswordUpdateSchema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(regExps.password, {
      message:
        "Пароль должен содержать хотя бы один специальный символ, одну заглавную букву, минимум 2 цифры, и его длина должна быть от 12 до 30 символов без пробелов",
    })
    .required("Это поле обязательно для заполнения!"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newCred")], "Пароли должны совпадать!")
    .required("Это поле обязательно для заполнения!"),
})

export type AuthPasswordUpdateRequest = yup.InferType<typeof AuthPasswordUpdateSchema>
