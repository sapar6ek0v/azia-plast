import type { Base } from "@/services/types"

export interface UserPresenter extends Base {
  username: string
  fullName: string
  phoneNumber?: string
  roles: string[]
  raw: UserRawPresenter
}

export interface UserRawPresenter extends Base {
  username: string
  name: string
  surname: string
  patronymic: string
  phoneNumber?: string
  rolesId: number[]
}
