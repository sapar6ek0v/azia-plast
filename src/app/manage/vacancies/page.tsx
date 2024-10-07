import { getVacancies } from "@/app/manage/vacancies/actions"
import { vacancyColumns } from "@/app/manage/vacancies/columns"
import VacanciesModalManager from "@/app/manage/vacancies/components/VacanciesModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Вакансии",
}

export default async function VacanciesPage() {
  const vacancies = await getVacancies()

  return (
    <>
      <VacanciesModalManager />
      <DataTable data={vacancies} columns={vacancyColumns} />
    </>
  )
}
