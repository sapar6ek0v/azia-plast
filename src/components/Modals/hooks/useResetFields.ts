import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { useEffect } from "react"

export const useResetFields = (state: ServerActionState, onReset: () => void) => {
  useEffect(() => {
    const resetFields = () => {
      if (state.state === CustomResponseStatus.SUCCESS) {
        onReset()
      }
    }

    resetFields()
  }, [state])
}
