import type { AuthResponse } from "@/services/auth/entity"
import {
  type AuthPasswordUpdateRequest,
  AuthPasswordUpdateSchema,
  type AuthRequest,
  AuthSchema,
} from "@/services/auth/schemes"
import type { CustomResponse } from "@/services/types"
import axios from "axios"

export class AuthApi {
  static async login(body: AuthRequest) {
    const {
      data: { data },
    } = await axios.post<CustomResponse<AuthResponse>>("/auth/login", AuthSchema.cast(body))
    return data
  }

  static async refreshAccess(refreshToken: string) {
    const {
      data: { data },
    } = await axios.post<CustomResponse<AuthResponse>>(`/auth/refresh?refreshToken=${refreshToken}`)

    return data
  }

  static async logout() {
    const {
      data: { data },
    } = await axios.get<CustomResponse<boolean>>("/auth/logout")
    return data
  }

  static async changePassword(body: AuthPasswordUpdateRequest) {
    const { confirmNewPassword } = AuthPasswordUpdateSchema.cast(body)

    const {
      data: { data },
    } = await axios.put<CustomResponse<AuthResponse>>(`/auth/password?newPassword=${confirmNewPassword}`)
    return data
  }
}
