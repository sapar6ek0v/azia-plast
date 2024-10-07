"use client"

import { deleteCertificate } from "@/app/manage/certificates/actions"
import ActionDeleteButton from "@/components/Actions/ActionDeleteButton"
import { Button } from "@/components/ui/button"
import type { CertificatePresenter } from "@/services/certificates/presenter"
import { modalsStore } from "@/stores/modals"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const categoryColumns: ColumnDef<CertificatePresenter>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "description",
    header: "Описание",
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
          <ActionDeleteButton id={raw.id} deleteAction={deleteCertificate} />
        </div>
      )
    },
  },
]
