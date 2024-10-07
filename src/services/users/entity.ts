import type { Role } from "@/services/roles/entity"
import type { Base } from "@/services/types"

export interface User extends Base {
  username: string
  name: string
  surname: string
  patronymic: string
  phoneNumber?: string
  roles: Role[]
}

export interface UserShortInfo extends Base {
  username: string
  roles: Role[]
}
