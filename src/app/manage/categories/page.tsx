import { getCategories } from "@/app/manage/categories/actions"
import { categoryColumns } from "@/app/manage/categories/columns"
import CategoriesModalManager from "@/app/manage/categories/components/CategoriesModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Категории",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <CategoriesModalManager />
      <DataTable data={categories} columns={categoryColumns} />
    </>
  )
}
