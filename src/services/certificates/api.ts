import type { Certificate } from "@/services/certificates/entity"
import { CertificatesProcessor } from "@/services/certificates/processor"
import type {
  CertificateCreateRequest,
  CertificateDeleteRequest,
  CertificateUpdateRequest,
} from "@/services/certificates/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"
import { toFormData } from "@/utils/formData"

export class CertificatesApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<Certificate[]>>("/certificate/all", {
      next: { tags: CertificatesProcessor.getTags() },
      cache: "no-store",
    })
  }

  static async get(certificateId: number) {
    return await fetchWrapper.get<CustomResponse<Certificate>>(`/certificate?certificateId=${certificateId}`)
  }

  static async create(body: CertificateCreateRequest) {
    return await fetchWrapper.postMultipart<CustomResponse<Certificate>>("/certificate", toFormData(body))
  }

  static async update(body: CertificateUpdateRequest) {
    return await fetchWrapper.putMultipart<CustomResponse<Certificate>>("/certificate", toFormData(body))
  }

  static async delete({ id }: CertificateDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<boolean>>(`/certificate?certificateId=${id}`)
  }
}
