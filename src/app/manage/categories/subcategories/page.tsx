import { getCategories } from "@/app/manage/categories/actions"
import { getSubcategories } from "@/app/manage/categories/subcategories/actions"
import { subcategoryColumns } from "@/app/manage/categories/subcategories/columns"
import SubcategoriesModalManager from "@/app/manage/categories/subcategories/components/SubcategoriesModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import { SubcategoriesProcessor } from "@/services/subcategories/processor"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Подкотегории",
}

export default async function SubcategoriesPage() {
  const [subcategories, categories] = await Promise.all([getSubcategories(), getCategories()])

  return (
    <>
      <SubcategoriesModalManager categories={categories} />
      <DataTable
        data={SubcategoriesProcessor.toPresenterList(subcategories || [], categories)}
        columns={subcategoryColumns}
      />
    </>
  )
}
