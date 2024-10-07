import type { ServerActionState } from "@/services/types"

export type FormSubmitAction = (prevData: ServerActionState, data: FormData) => Promise<ServerActionState>

export interface FormSelectOption {
  value: number | string
  label: string
  numericValue?: number
}

export interface FormFieldConfig {
  name: string
  label: string
  as?: "textarea" | "color" | "upload" | "phone" | "select" | "multi-select"
  placeholder?: string
  options?: FormSelectOption[]
  isNotVisibleInCreate?: boolean
  isNotVisibleInUpdate?: boolean
  maxFileSize?: number
  accept?: string
}

export interface FormConfig {
  fields: FormFieldConfig[]
  validationSchema: any
}
