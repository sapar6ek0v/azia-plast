"use client"

import { createNews, updateNews } from "@/app/manage/news/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import { NewsCreateSchema, NewsUpdateSchema } from "@/services/news/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconNews } from "@tabler/icons-react"

const NewsModalManager = () => {
  const { isCreateModalVisible } = useModalsStore((state) => state)

  const formConfig: FormConfig = {
    fields: [
      {
        name: "title",
        label: "Заголовок",
        placeholder: "Введите заголовок",
      },
      {
        name: "description",
        label: "Описание",
        placeholder: "Введите описание",
        as: "textarea",
      },
      {
        name: "noticeImage",
        label: "Изображение",
        as: "upload",
      },
    ],
    validationSchema: isCreateModalVisible ? NewsCreateSchema : NewsUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание новости'
        titleIcon={IconNews}
        formConfig={formConfig}
        serverAction={createNews}
      />
      <UpdateFormModal
        title='Редактирование новости'
        titleIcon={IconNews}
        formConfig={formConfig}
        serverAction={updateNews}
      />
    </>
  )
}

export default NewsModalManager
