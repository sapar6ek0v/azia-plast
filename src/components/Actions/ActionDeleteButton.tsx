"use client"

import { Button } from "@/components/ui/button"
import type { ServerActionState } from "@/services/types"
import { useToastForServerResponse } from "@/utils/hooks/useToastForServerResponse"
import { IconLoader2, IconTrash } from "@tabler/icons-react"
import { useFormState, useFormStatus } from "react-dom"

interface Props {
  id: number
  deleteAction: (prevData: ServerActionState, data: FormData) => Promise<ServerActionState>
}

const Submit = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' variant='destructive' disabled={pending}>
      {pending ? <IconLoader2 className='h-4 w-4 animate-spin' /> : <IconTrash className='h-4 w-4' />}
    </Button>
  )
}

const ActionDeleteButton = ({ id, deleteAction }: Props) => {
  const [state, formAction] = useFormState(deleteAction, {})

  useToastForServerResponse(state)

  return (
    <form action={formAction}>
      <input hidden readOnly type='number' name='id' value={id} />
      <Submit />
    </form>
  )
}

export default ActionDeleteButton
