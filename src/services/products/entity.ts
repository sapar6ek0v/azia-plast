import type { ProductCharacteristic } from "@/services/productCharacteristics/entity"
import type { ProductImage } from "@/services/productImages/entity"
import type { Subcategory } from "@/services/subcategories/entity"
import type { Base } from "@/services/types"

export interface Product extends Base {
  name: string
  idFromFactoryBd: number
  subcategory: Subcategory
  productCharacteristics: ProductCharacteristic[]
  images: ProductImage[]
}

export interface ProductsBySubcategoryResponse {
  totalPages: number
  totalElements: number
  productsAmount: number
  products: Product[]
}
