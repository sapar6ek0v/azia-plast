import type { Base } from "@/services/types"

export interface News extends Base {
  title: string
  description: string
  isActive: boolean
  noticeImage: string
  imageType: string
  createdTime: string
  updatedTime: string
}
