import type { ProductColor } from "@/services/productColors/entity"
import type { Base } from "@/services/types"

export interface ProductColorPresenter extends Base {
  name: string
  hexCode: string
  raw: ProductColor
}
