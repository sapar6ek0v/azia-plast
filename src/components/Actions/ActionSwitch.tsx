"use client"

import { Switch } from "@/components/ui/switch"
import type { ServerActionState } from "@/services/types"
import { toFormData } from "@/utils/formData"
import { useToastForServerResponse } from "@/utils/hooks/useToastForServerResponse"
import { IconLoader2 } from "@tabler/icons-react"
import { useTransition } from "react"
import { useFormState } from "react-dom"

interface Props {
  id: number
  checked: boolean
  switchAction: (prevData: ServerActionState, data: FormData) => Promise<ServerActionState>
}

const ActionSwitch = ({ id, checked, switchAction }: Props) => {
  const [state, formAction] = useFormState(switchAction, {})
  const [pending, startTransition] = useTransition()

  useToastForServerResponse(state)

  const handleOnChange = (value: boolean) => {
    startTransition(() => {
      formAction(toFormData({ id, checked: value }))
    })
  }

  return (
    <div>
      <input hidden readOnly type='number' name='id' value={id} />
      {!pending ? (
        <Switch checked={checked} onCheckedChange={handleOnChange} />
      ) : (
        <IconLoader2 className='text-primary h-6 w-6 animate-spin' />
      )}
    </div>
  )
}

export default ActionSwitch
