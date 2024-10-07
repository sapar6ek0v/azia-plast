"use client"

import { deleteNews, toggleNewsActivity } from "@/app/manage/news/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import ActionSwitch from "@/components/Actions/ActionSwitch"
import { Button } from "@/components/ui/button"
import type { NewsPresenter } from "@/services/news/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const newsColumns: ColumnDef<NewsPresenter>[] = [
  {
    accessorKey: "title",
    header: "Заголовок",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    accessorKey: "imgUrl",
    header: "Изображение",
    cell: ({ row: { original } }) => (
      <Image src={original.imgUrl} alt={original.title} width={150} height={50} className='rounded-md shadow' />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Статус",
    cell: ({ row: { original } }) => (
      <ActionSwitch id={original.id} checked={original.isActive} switchAction={toggleNewsActivity} />
    ),
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteNews} />
        </div>
      )
    },
  },
]
