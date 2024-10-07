import type { FormSelectOption } from "@/components/Modals/types"
import type { Role } from "@/services/roles/entity"
import type { RolePresenter } from "@/services/roles/presenter"

export class RolesProcessor {
  private static tags = ["roles"]

  static getTags() {
    return RolesProcessor.tags
  }

  static getTag() {
    return RolesProcessor.tags[0]
  }

  static toPresenterList(roles: Role[]) {
    return roles.map<RolePresenter>((role) => ({
      id: role.id,
      role: role.role,
      raw: role,
    }))
  }

  static toSelectorOptions(roles: Role[]) {
    return roles.map<FormSelectOption>(({ id, role }) => ({
      value: id,
      label: role,
    }))
  }
}
