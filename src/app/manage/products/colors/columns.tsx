"use client"

import { deleteProductColor } from "@/app/manage/products/colors/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Button } from "@/components/ui/button"
import type { ProductColorPresenter } from "@/services/productColors/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"

export const productColorColumns: ColumnDef<ProductColorPresenter>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "hexCode",
    header: "Цвет",
    cell: ({
      row: {
        original: { hexCode },
      },
    }) => <div className='w-10 h-5 rounded-md shadow' style={{ backgroundColor: hexCode }} />,
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteProductColor} />
        </div>
      )
    },
  },
]
