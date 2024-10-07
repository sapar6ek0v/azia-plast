import { getCategories } from "@/app/manage/categories/actions"
import { categoryColumns } from "@/app/manage/categories/columns"
import CategoriesModalManager from "@/app/manage/categories/components/CategoriesModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"

export default async function CategoriesPage() {
  const categories = await getCategories()
  console.log({ categories })
  return (
    <>
      <CategoriesModalManager />
      <DataTable data={categories} columns={categoryColumns} />
    </>
  )
}
