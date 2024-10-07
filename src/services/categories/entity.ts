import type { SubcategoryShortInfo } from "@/services/subcategories/entity"
import type { Base } from "@/services/types"

export interface Category extends Base {
  name: string
  categoryImage: string
  imageType: string
  subcategories: SubcategoryShortInfo[]
}
