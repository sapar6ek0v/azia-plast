import type { Subcategory } from "@/services/subcategories/entity"
import { SubcategoriesProcessor } from "@/services/subcategories/processor"
import type {
  SubCategoryDeleteRequest,
  SubcategoryCreateRequest,
  SubcategoryUpdateRequest,
} from "@/services/subcategories/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"
import { toFormData } from "@/utils/formData"

export class SubcategoriesApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<Subcategory[]>>("/subcategory/all", {
      next: { tags: SubcategoriesProcessor.getTags() },
      cache: "no-store",
    })
  }

  static async get(subcategoryId: number) {
    return await fetchWrapper.get<CustomResponse<Subcategory>>(`/subcategory?subcategoryId=${subcategoryId}`)
  }

  static async create(body: SubcategoryCreateRequest) {
    return await fetchWrapper.postMultipart<CustomResponse<Subcategory>>("/subcategory", toFormData(body))
  }

  static async update(body: SubcategoryUpdateRequest) {
    return await fetchWrapper.putMultipart<CustomResponse<Subcategory>>("/subcategory", toFormData(body))
  }

  static async delete({ id }: SubCategoryDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<boolean>>(`/subcategory?subcategoryId=${id}`)
  }
}
