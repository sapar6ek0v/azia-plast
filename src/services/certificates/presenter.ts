import type { Certificate } from "@/services/certificates/entity"
import type { Base } from "@/services/types"

export interface CertificatePresenter extends Base {
  name: string
  description: string
  imgUrl: string
  raw: Certificate
}
