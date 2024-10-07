"use client"

import { deleteVacancy } from "@/app/manage/vacancies/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Button } from "@/components/ui/button"
import type { VacancyPresenter } from "@/services/vacancies/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"

export const vacancyColumns: ColumnDef<VacancyPresenter>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    accessorKey: "offer",
    header: "Предложение",
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteVacancy} />
        </div>
      )
    },
  },
]
