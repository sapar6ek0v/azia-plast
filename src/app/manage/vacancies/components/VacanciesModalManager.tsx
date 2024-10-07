"use client"

import { createVacancy, updateVacancy } from "@/app/manage/vacancies/actions"
import CreateFormModal from "@/components/Modals/CreateFormModal"
import UpdateFormModal from "@/components/Modals/UpdateFormModal"
import type { FormConfig } from "@/components/Modals/types"
import { VacancyCreateSchema, VacancyUpdateSchema } from "@/services/vacancies/schemes"
import { useModalsStore } from "@/stores/modals"
import { IconBriefcase } from "@tabler/icons-react"

const VacanciesModalManager = () => {
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
        name: "offer",
        label: "Предложение",
        placeholder: "Введите предложение",
        as: "textarea",
      },
    ],
    validationSchema: isCreateModalVisible ? VacancyCreateSchema : VacancyUpdateSchema,
  }

  return (
    <>
      <CreateFormModal
        title='Создание новой вакансии'
        titleIcon={IconBriefcase}
        formConfig={formConfig}
        serverAction={createVacancy}
      />
      <UpdateFormModal
        title='Редактирование вакансии'
        titleIcon={IconBriefcase}
        formConfig={formConfig}
        serverAction={updateVacancy}
      />
    </>
  )
}

export default VacanciesModalManager
