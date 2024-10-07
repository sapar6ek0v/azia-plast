import { getProductColors } from "@/app/manage/products/colors/actions"
import { productColorColumns } from "@/app/manage/products/colors/columns"
import ProductColorsModalManager from "@/app/manage/products/colors/components/ProductColorsModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Цвета продуктов",
}

export default async function ProductColorsPage() {
  const productColors = await getProductColors()

  return (
    <>
      <ProductColorsModalManager />
      <DataTable data={productColors} columns={productColorColumns} />
    </>
  )
}
