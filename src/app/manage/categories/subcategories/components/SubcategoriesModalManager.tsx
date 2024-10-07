"use client"

import { createSubcategory, updateSubcategory } from "@/app/manage/categories/subcategories/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import type { CategoryPresenter } from "@/services/categories/presenter"
import { CategoriesProcessor } from "@/services/categories/processor"
import { SubcategoryCreateSchema, SubcategoryUpdateSchema } from "@/services/subcategories/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconCategoryFilled } from "@tabler/icons-react"

interface Props {
  categories: CategoryPresenter[]
}

const SubcategoriesModalManager = ({ categories }: Props) => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "name",
        label: "Название",
        placeholder: "Введите название",
      },
      {
        name: "categoryId",
        label: "Категория",
        placeholder: "Выберите категорию",
        as: "select",
        options: CategoriesProcessor.toSelectorOptions(categories),
      },
      {
        name: "subcategoryImage",
        label: "Изображение",
        as: "upload",
        accept: "image/*",
      },
    ],
    validationSchema: isCreateModalVisible ? SubcategoryCreateSchema : SubcategoryUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание подкатегории'
        titleIcon={IconCategoryFilled}
        formConfig={formConfig}
        serverAction={createSubcategory}
      />
      <UpdateFormModal
        title='Редактирование подкатегории'
        titleIcon={IconCategoryFilled}
        formConfig={formConfig}
        serverAction={updateSubcategory}
      />
    </>
  )
}

export default SubcategoriesModalManager
