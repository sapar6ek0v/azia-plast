import type { Base } from "@/services/types"

export interface Certificate extends Base {
  name: string
  description: string
  certificateImage: string
  certificateImageType: string
}
