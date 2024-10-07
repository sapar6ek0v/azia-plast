import { CustomResponseStatus, type ServerActionState } from "@/services/types"
import { useToast } from "@/utils/hooks/useToast"
import { useEffect } from "react"

export const useToastForServerResponse = (state: ServerActionState) => {
  const { toast } = useToast()

  useEffect(() => {
    const processResponse = () => {
      if (state.state === CustomResponseStatus.ERROR && state.message === "Validation error") {
        if (Array.isArray(state.data)) {
          for (const item of state.data) {
            toast({
              variant: "destructive",
              title: "Ошибка",
              description: item,
            })
          }
        }
        return
      }

      switch (state.state) {
        case CustomResponseStatus.SUCCESS:
          toast({
            variant: "success",
            title: "Успешно",
            description: state.message,
          })
          break
        case CustomResponseStatus.ERROR:
          toast({
            variant: "success",
            title: "Ошибка",
            description: state.message,
          })
          break
        case CustomResponseStatus.DUPLICATE:
          toast({
            variant: "warning",
            title: "Ошибка",
            description: state.message,
          })
          break
      }
    }

    processResponse()
  }, [state, toast])
}
