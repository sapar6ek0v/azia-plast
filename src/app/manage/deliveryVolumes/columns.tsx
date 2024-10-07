"use client"

import { deleteCategory } from "@/app/manage/categories/actions"
import { Button } from "@/components/ui/button"
import type { CategoryPresenter } from "@/services/categories/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const categoryColumns: ColumnDef<CategoryPresenter>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "imgUrl",
    header: "Изображение",
    cell: ({ row: { original } }) => {
      return <Image src={original.imgUrl} alt={original.name} width={150} height={50} className='rounded-md shadow' />
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row: { original } }) => {
      const { openUpdateModal } = modalsStore.getState()

      return (
        <div className='flex items-center gap-4'>
          <Button variant='secondary' onClick={() => openUpdateModal(original)}>
            <IconPencil size={20} />
          </Button>
          <Button variant='destructive' onClick={() => deleteCategory({}, new FormData({ id: original.id }))}>
            <IconTrash size={20} />
          </Button>
        </div>
      )
    },
  },
]
