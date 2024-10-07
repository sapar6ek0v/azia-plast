import type { Category } from "@/services/categories/entity"
import { CategoriesProcessor } from "@/services/categories/processor"
import type { CategoryCreateRequest, CategoryDeleteRequest, CategoryUpdateRequest } from "@/services/categories/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"
import { toFormData } from "@/utils/formData"

export class CategoriesApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<Category[]>>("/category/all", {
      next: { tags: CategoriesProcessor.getTags() },
      cache: "no-store",
    })
  }

  static async get(categoryId: number) {
    return await fetchWrapper.get<CustomResponse<Category>>(`/category?categoryId=${categoryId}`, { cache: "no-store" })
  }

  static async create(body: CategoryCreateRequest) {
    return await fetchWrapper.postMultipart<CustomResponse<Category>>("/category", toFormData(body))
  }

  static async update(body: CategoryUpdateRequest) {
    return await fetchWrapper.putMultipart<CustomResponse<Category>>("/category", toFormData(body))
  }

  static async delete({ id }: CategoryDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<Category>>(`/category?categoryId=${id}`)
  }
}
