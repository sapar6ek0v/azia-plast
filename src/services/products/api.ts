import type { Product, ProductsBySubcategoryResponse } from "@/services/products/entity"
import {
  type ProductCreateRequest,
  ProductCreateSchema,
  type ProductUpdateRequest,
  ProductUpdateSchema,
  type ProductsBySubcategoryGetRequest,
  ProductsBySubcategoryGetSchema,
} from "@/services/products/schemes"
import type { CustomResponse } from "@/services/types"
import axios from "axios"

export class ProductsApi {
  static async getBySubcategoryProducts(body: ProductsBySubcategoryGetRequest) {
    const {
      data: { data },
    } = await axios.get<CustomResponse<ProductsBySubcategoryResponse>>("/product/subcategory", {
      params: ProductsBySubcategoryGetSchema.cast(body),
    })

    return data
  }

  static async get(productId: number) {
    const {
      data: { data },
    } = await axios.get<CustomResponse<Product>>(`/product?productId=${productId}`)

    return data
  }

  static async create(body: ProductCreateRequest) {
    const {
      data: { data },
    } = await axios.post<CustomResponse<string>>("/product", ProductCreateSchema.cast(body))

    return data
  }

  static async update(body: ProductUpdateRequest) {
    const {
      data: { data },
    } = await axios.put<CustomResponse<string>>("/product", ProductUpdateSchema.cast(body))

    return data
  }

  static async delete(productId: number) {
    const {
      data: { data },
    } = await axios.delete<CustomResponse<boolean>>(`/product?productId=${productId}`)

    return data
  }
}
