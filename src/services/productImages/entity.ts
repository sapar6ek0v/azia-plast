import type { ProductColor } from "@/services/productColors/entity"
import type { Types } from "@/services/types"

export interface ProductImage extends Types {
  productId: number
  productImage: string
  productImageType: string
  color: ProductColor
}
