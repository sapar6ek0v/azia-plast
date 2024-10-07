import type { Base } from "@/services/types"

export interface Subcategory extends Base {
  name: string
  subcategoryImage: string
  subcategoryImageType: string
  categoryId: number
  productsIds: number[]
}

export interface SubcategoryShortInfo extends Base {
  name: string
}
