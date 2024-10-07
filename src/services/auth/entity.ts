import type { UserShortInfo } from "@/services/users/entity"

export interface AuthResponse extends UserShortInfo {
  accessToken: string
  refreshToken: string
}
