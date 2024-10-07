import type { Base } from "@/services/types"

export interface CategoryPresenter extends Base {
  name: string
  imgUrl: string
  subcategories: string[]
  raw: CategoryRawPresenter
}

export interface CategoryRawPresenter extends Base {
  name: string
  multipartFile: string
}
