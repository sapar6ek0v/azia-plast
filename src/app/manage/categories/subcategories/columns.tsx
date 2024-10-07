"use client"

import { deleteSubcategory } from "@/app/manage/categories/subcategories/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { SubcategoryPresenter } from "@/services/subcategories/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const subcategoryColumns: ColumnDef<SubcategoryPresenter>[] = [
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
    accessorKey: "category",
    header: "Категория",
    cell: ({ row: { original } }) => <Badge>{original.category}</Badge>,
  },
  {
    accessorKey: "products",
    header: "Продукты",
    cell: ({ row: { original } }) => {
      return original.products?.length
        ? original.products.map((product) => <Badge key={product}>{product}</Badge>)
        : null
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteSubcategory} />
        </div>
      )
    },
  },
]
