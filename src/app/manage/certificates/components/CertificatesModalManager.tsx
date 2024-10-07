"use client"

import { createCertificate, updateCertificate } from "@/app/manage/certificates/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import { CertificateCreateSchema, CertificateUpdateSchema } from "@/services/certificates/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconCertificate } from "@tabler/icons-react"

const CertificatesModalManager = () => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "name",
        label: "Название",
        placeholder: "Введите название",
      },
      {
        name: "description",
        label: "Описание",
        placeholder: "Введите описание",
        as: "textarea",
      },
      {
        name: "certificateImage",
        label: "Изображение",
        as: "upload",
        accept: "image/*",
      },
    ],
    validationSchema: isCreateModalVisible ? CertificateCreateSchema : CertificateUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание сертификата'
        titleIcon={IconCertificate}
        formConfig={formConfig}
        serverAction={createCertificate}
      />
      <UpdateFormModal
        title='Редактирование сертификата'
        titleIcon={IconCertificate}
        formConfig={formConfig}
        serverAction={updateCertificate}
      />
    </>
  )
}

export default CertificatesModalManager
