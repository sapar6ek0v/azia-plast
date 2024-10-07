import type { CustomResponse } from "@/services/types"
import type { User } from "@/services/users/entity"
import { UsersProcessor } from "@/services/users/processor"
import type { UserCreateRequest, UserDeleteRequest, UserUpdateRequest } from "@/services/users/schemes"
import { fetchWrapper } from "@/services/wrapper"

export class UsersApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<User[]>>("/user/all", {
      next: { tags: UsersProcessor.getTags(), revalidate: 3600 },
    })
  }

  static async get(userId: number) {
    return await fetchWrapper.get<CustomResponse<User>>(`/user?userId=${userId}`)
  }

  static async create(body: UserCreateRequest) {
    return await fetchWrapper.post<CustomResponse<User>>("/user", body)
  }

  static async update(body: UserUpdateRequest) {
    return await fetchWrapper.put<CustomResponse<User>>("/user", body)
  }

  static async delete({ userId }: UserDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<boolean>>(`/user?userId=${userId}`)
  }
}
