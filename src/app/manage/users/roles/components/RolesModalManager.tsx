"use client"

import { createRole, updateRole } from "@/app/manage/users/roles/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import { RoleCreateSchema, RoleUpdateSchema } from "@/services/roles/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconCategory } from "@tabler/icons-react"

const RolesModalManager = () => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "role",
        label: "Название",
        placeholder: "Введите название",
      },
    ],
    validationSchema: isCreateModalVisible ? RoleCreateSchema : RoleUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание новой роли'
        titleIcon={IconCategory}
        formConfig={formConfig}
        serverAction={createRole}
      />
      <UpdateFormModal
        title='Редактирование роли'
        titleIcon={IconCategory}
        formConfig={formConfig}
        serverAction={updateRole}
      />
    </>
  )
}

export default RolesModalManager
