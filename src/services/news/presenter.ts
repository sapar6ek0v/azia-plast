import type { Base } from "@/services/types"

export interface NewsPresenter extends Base {
  title: string
  description: string
  isActive: boolean
  imgUrl: string
  createdTime: string
  updatedTime: string
  raw: NewsRawPresenter
}

export interface NewsRawPresenter extends Base {
  title: string
  description: string
  noticeImage: string
}
