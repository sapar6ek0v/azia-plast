import type { ProductImage } from "@/services/productImages/entity"
import {
  type ProductImageCreateRequest,
  ProductImageCreateSchema,
  type ProductImageUpdateRequest,
  ProductImageUpdateSchema,
} from "@/services/productImages/schemes"
import type { CustomResponse } from "@/services/types"
import axios from "axios"

export class ProductImagesApi {
  static async getAll() {
    const {
      data: { data },
    } = await axios.get<CustomResponse<ProductImage[]>>("/image/all")

    return data
  }

  static async get(imageId: number) {
    const {
      data: { data },
    } = await axios.get<CustomResponse<ProductImage>>(`/image?imageId=${imageId}`)

    return data
  }

  static async create(body: ProductImageCreateRequest) {
    const {
      data: { data },
    } = await axios.post<CustomResponse<ProductImage>>("/image", ProductImageCreateSchema.cast(body))

    return data
  }

  static async update(body: ProductImageUpdateRequest) {
    const {
      data: { data },
    } = await axios.put<CustomResponse<ProductImageUpdateRequest>>("/image", ProductImageUpdateSchema.cast(body))

    return data
  }

  static async delete(imageId: number) {
    const {
      data: { data },
    } = await axios.delete<CustomResponse<boolean>>(`/image?imageId=${imageId}`)

    return data
  }
}
