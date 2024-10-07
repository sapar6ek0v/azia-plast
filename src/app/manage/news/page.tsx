import { getNews } from "@/app/manage/news/actions"
import { newsColumns } from "@/app/manage/news/columns"
import NewsModalManager from "@/app/manage/news/components/NewsModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Новости",
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <>
      <NewsModalManager />
      <DataTable data={news} columns={newsColumns} />
    </>
  )
}
