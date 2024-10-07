import type { ProductColor } from "@/services/productColors/entity"
import { ProductColorsProcessor } from "@/services/productColors/processor"
import type {
  ProductColorCreateRequest,
  ProductColorDeleteRequest,
  ProductColorUpdateRequest,
} from "@/services/productColors/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"

export class ProductColorsApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<ProductColor[]>>("/color/all", {
      next: { tags: ProductColorsProcessor.getTags(), revalidate: 3600 },
    })
  }

  static async get(colorId: number) {
    return await fetchWrapper.get<CustomResponse<ProductColor[]>>(`/color?colorId=${colorId}`)
  }

  static async create(body: ProductColorCreateRequest) {
    return await fetchWrapper.post<CustomResponse<ProductColor>>("/color", body)
  }

  static async update(body: ProductColorUpdateRequest) {
    return await fetchWrapper.put<CustomResponse<ProductColor>>("/color", body)
  }

  static async delete({ id }: ProductColorDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<ProductColor>>(`/color?colorId=${id}`)
  }
}
