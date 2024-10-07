"use client"

import { createProductColor, updateProductColor } from "@/app/manage/products/colors/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import { ProductColorCreateSchema, ProductColorUpdateSchema } from "@/services/productColors/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconColorPicker } from "@tabler/icons-react"

const ProductColorsModalManager = () => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "name",
        label: "Название",
        placeholder: "Введите название",
      },
      {
        name: "hexCode",
        label: "Цвет",
        as: "color",
      },
    ],
    validationSchema: isCreateModalVisible ? ProductColorCreateSchema : ProductColorUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание цвета продукта'
        titleIcon={IconColorPicker}
        formConfig={formConfig}
        serverAction={createProductColor}
      />
      <UpdateFormModal
        title='Редактирование цвета продукта'
        titleIcon={IconColorPicker}
        formConfig={formConfig}
        serverAction={updateProductColor}
      />
    </>
  )
}

export default ProductColorsModalManager
