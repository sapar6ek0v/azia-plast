"use client"

import { createProductCharacteristic, updateProductCharacteristic } from "@/app/manage/products/characteristics/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import {
  ProductCharacteristicCreateSchema,
  ProductCharacteristicUpdateSchema,
} from "@/services/productCharacteristics/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconAbc } from "@tabler/icons-react"

const ProductCharacteristicsModalManager = () => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "name",
        label: "Название",
        placeholder: "Введите название",
      },
    ],
    validationSchema: isCreateModalVisible ? ProductCharacteristicCreateSchema : ProductCharacteristicUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание характеристики продукта'
        titleIcon={IconAbc}
        formConfig={formConfig}
        serverAction={createProductCharacteristic}
      />
      <UpdateFormModal
        title='Редактирование характеристики продукта'
        titleIcon={IconAbc}
        formConfig={formConfig}
        serverAction={updateProductCharacteristic}
      />
    </>
  )
}

export default ProductCharacteristicsModalManager
