"use client"

import { createCategory, updateCategory } from "@/app/manage/categories/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import { CategoryCreateSchema, CategoryUpdateSchema } from "@/services/categories/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconCategory } from "@tabler/icons-react"

const CategoriesModalManager = () => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "name",
        label: "Название",
        placeholder: "Введите название",
      },
      {
        name: "multipartFile",
        label: "Изображение",
        as: "upload",
      },
    ],
    validationSchema: isCreateModalVisible ? CategoryCreateSchema : CategoryUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание категории'
        titleIcon={IconCategory}
        formConfig={formConfig}
        serverAction={createCategory}
      />
      <UpdateFormModal
        title='Редактирование категории'
        titleIcon={IconCategory}
        formConfig={formConfig}
        serverAction={updateCategory}
      />
    </>
  )
}

export default CategoriesModalManager
