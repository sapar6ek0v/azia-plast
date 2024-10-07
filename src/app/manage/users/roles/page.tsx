import { getRoles } from "@/app/manage/users/roles/actions"
import { roleColumns } from "@/app/manage/users/roles/columns"
import RolesModalManager from "@/app/manage/users/roles/components/RolesModalManager"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Роли",
}

export default async function RolesPage() {
  const roles = await getRoles()

  return (
    <>
      <RolesModalManager />
      <DataTable data={roles} columns={roleColumns} />
    </>
  )
}
