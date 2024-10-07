import type { Role } from "@/services/roles/entity"
import { RolesProcessor } from "@/services/roles/processor"
import type { RoleCreateRequest, RoleDeleteRequest, RoleUpdateRequest } from "@/services/roles/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"

export class RolesApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<Role[]>>("/role", {
      next: { tags: RolesProcessor.getTags(), revalidate: 3600 },
    })
  }

  static async get(roleId: number) {
    return await fetchWrapper.get<CustomResponse<Role>>(`role/id?id=${roleId}`)
  }

  static async create(body: RoleCreateRequest) {
    return await fetchWrapper.post<CustomResponse<Role>>(`/role`, body)
  }

  static async update(body: RoleUpdateRequest) {
    return await fetchWrapper.put<CustomResponse<Role>>(`/role`, body)
  }

  static async delete({ id }: RoleDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<boolean>>(`/role?id=${id}`)
  }
}
