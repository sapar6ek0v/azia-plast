"use client"

import { createUser, updateUser } from "@/app/manage/users/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import type { Role } from "@/services/roles/entity"
import { RolesProcessor } from "@/services/roles/processor"
import { UserCreateSchema, UserUpdateSchema } from "@/services/users/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconCategory } from "@tabler/icons-react"

interface Props {
  roles: Role[]
}

const UsersModalManager = ({ roles }: Props) => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "username",
        label: "Имя пользователя",
        placeholder: "Введите имя пользователя",
      },
      {
        name: "name",
        label: "Имя",
        placeholder: "Введите имя",
      },
      {
        name: "surname",
        label: "Фамилия",
        placeholder: "Введите фамилию",
      },
      {
        name: "patronymic",
        label: "Отчество",
        placeholder: "Введите отчество",
      },
      {
        name: "phoneNumber",
        label: "Номер телефона",
        placeholder: "Введите номер телефона",
        as: "phone",
      },
      {
        name: "rolesId",
        label: "Роли",
        placeholder: "Выберите роли",
        as: "multi-select",
        options: RolesProcessor.toSelectorOptions(roles),
      },
    ],
    validationSchema: isCreateModalVisible ? UserCreateSchema : UserUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание нового пользователя'
        titleIcon={IconCategory}
        formConfig={formConfig}
        serverAction={createUser}
      />
      <UpdateFormModal
        title='Редактирование пользователя'
        titleIcon={IconCategory}
        formConfig={formConfig}
        serverAction={updateUser}
      />
    </>
  )
}

export default UsersModalManager
