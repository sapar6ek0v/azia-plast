import type { Role } from "@/services/roles/entity"
import type { Base } from "@/services/types"

export interface RolePresenter extends Base {
  role: string
  raw: Role
}
