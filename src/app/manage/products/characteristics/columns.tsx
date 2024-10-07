"use client"

import { deleteProductCharacteristic } from "@/app/manage/products/characteristics/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Button } from "@/components/ui/button"
import type { ProductCharacteristicPresenter } from "@/services/productCharacteristics/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"

export const productCharacteristicColumns: ColumnDef<ProductCharacteristicPresenter>[] = [
  {
    accessorKey: "name",
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteProductCharacteristic} />
        </div>
      )
    },
  },
]
