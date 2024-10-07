import { getUsers } from "@/app/manage/users/actions"
import { userColumns } from "@/app/manage/users/columns"
import UsersModalManager from "@/app/manage/users/components/UsersModalManager"
import { getRoles } from "@/app/manage/users/roles/actions"
import { DataTable } from "@/components/Tables/TheDataTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Пользователи",
}

export default async function UsersPage() {
  const [users, roles] = await Promise.all([getUsers(), getRoles()])

  return (
    <>
      <UsersModalManager roles={roles} />
      <DataTable data={users} columns={userColumns} />
    </>
  )
}
