"use client"

import { deleteRole } from "@/app/manage/users/roles/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Button } from "@/components/ui/button"
import type { RolePresenter } from "@/services/roles/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"

export const roleColumns: ColumnDef<RolePresenter>[] = [
  {
    accessorKey: "role",
    header: "Название",
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteRole} />
        </div>
      )
    },
  },
]
