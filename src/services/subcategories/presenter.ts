import type { Base } from "@/services/types"

export interface SubcategoryPresenter extends Base {
  name: string
  imgUrl: string
  category?: string
  products?: string[]
  raw: SubcategoryRawPresenter
}

export interface SubcategoryRawPresenter extends Base {
  name: string
  categoryId: number
  subcategoryImage: string
}
