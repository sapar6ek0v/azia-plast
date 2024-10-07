import { getProductCharacteristics } from "@/app/manage/products/characteristics/actions"
import { productCharacteristicColumns } from "@/app/manage/products/characteristics/columns"
import ProductCharacteristicsModalManager from "@/app/manage/products/characteristics/components/ProductCharacteristicsModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Характеристики продуктов",
}

export default async function ProductCharacteristicPage() {
  const productCharacteristics = await getProductCharacteristics()

  return (
    <>
      <ProductCharacteristicsModalManager />
      <DataTable data={productCharacteristics} columns={productCharacteristicColumns} />
    </>
  )
}
