"use client"

import { deleteUser } from "@/app/manage/users/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { UserPresenter } from "@/services/users/presenter"
import { UsersProcessor } from "@/services/users/processor"
import { modalsStore } from "@/stores/modals"
import { IconPencil, IconPhone } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"

export const userColumns: ColumnDef<UserPresenter>[] = [
  {
    accessorKey: "username",
    header: "Имя пользователя",
  },
  {
    accessorKey: "fullName",
    header: "ФИО",
  },
  {
    accessorKey: "phoneNumber",
    header: "Номер телефона",
    cell: ({ row: { original } }) => {
      return original.phoneNumber ? (
        <a
          href={original.phoneNumber}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-4 underline text-primary'
        >
          <IconPhone className='w-4 h-4' />
          <span>{UsersProcessor.formatPhoneNumber(original.phoneNumber)}</span>
        </a>
      ) : null
    },
  },
  {
    accessorKey: "roles",
    header: "Роли",
    cell: ({
      row: {
        original: { roles },
      },
    }) => {
      return (
        <div className='flex flex-wrap items-center gap-4'>
          {roles.map((role) => (
            <Badge key={role}>{role}</Badge>
          ))}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({
      row: {
        original: { raw },
      },
    }) => {
      const { openUpdateModal } = modalsStore.getState()

      return (
        <div className='flex items-center gap-4'>
          <Button variant='secondary' onClick={() => openUpdateModal(raw)}>
            <IconPencil size={20} />
          </Button>
          <ActionDeleteButton id={raw.id} deleteAction={deleteUser} />
        </div>
      )
    },
  },
]
