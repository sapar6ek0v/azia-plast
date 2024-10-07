import type { Base } from "@/services/types"

export interface ProductPresenter extends Base {
  name: string
  idFromFactoryBd: number
  raw: ProductRawPresenter
}

export interface ProductRawPresenter extends Base {
  name: string
  idFromFactoryBd: number
}
