import type { Certificate } from "@/services/certificates/entity"
import type { CertificatePresenter } from "@/services/certificates/presenter"
import { getBase64DataUrl } from "@/utils/base64"

export class CertificatesProcessor {
  private static tags = ["certificates"]

  static getTags() {
    return CertificatesProcessor.tags
  }

  static getTag() {
    return CertificatesProcessor.tags[0]
  }

  static toPresenterList(certificates: Certificate[]) {
    const convertToPresenter = (certificate: Certificate): CertificatePresenter => {
      const imgUrl = getBase64DataUrl(certificate.certificateImage, certificate.certificateImageType)

      return {
        id: certificate.id,
        name: certificate.name,
        description: certificate.description,
        imgUrl,
        raw: certificate,
      }
    }

    return certificates.map(convertToPresenter)
  }
}
