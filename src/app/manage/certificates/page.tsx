import { getCertificates } from "@/app/manage/certificates/actions"
import { categoryColumns } from "@/app/manage/certificates/columns"
import CertificatesModalManager from "@/app/manage/certificates/components/CertificatesModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"

export const metadata = {
  title: "Сертификаты",
}

export default async function CertificatesPage() {
  const certificates = await getCertificates()

  return (
    <>
      <CertificatesModalManager />
      <DataTable data={certificates} columns={categoryColumns} />
    </>
  )
}
