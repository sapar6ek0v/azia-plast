import type { Base } from "@/services/types"

export interface Vacancy extends Base {
  name: string
  description: string
  offer: string
}
