"use client"

import { useResetFields } from "@/components/Modals/hooks/useResetFields"
import type { FormConfig, FormFieldConfig, FormSubmitAction } from "@/components/Modals/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dropzone } from "@/components/ui/dropzone"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { Textarea } from "@/components/ui/textarea"
import { type ModalFormData, useModalsStore } from "@/stores/modals"
import { fromBase64ToFile } from "@/utils/base64"
import { toFormData } from "@/utils/formData"
import { useToastForServerResponse } from "@/utils/hooks/useToastForServerResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Icon, IconCheck, IconLoader2, IconX } from "@tabler/icons-react"
import React, { type FormEvent, useEffect, useRef, useTransition } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { withMask } from "use-mask-input"

interface Props {
  title: string
  titleIcon?: Icon
  formConfig: FormConfig
  serverAction: FormSubmitAction
}

const UpdateFormModal = ({ title, titleIcon, formConfig, serverAction }: Props) => {
  const { isUpdateModalVisible, updateFormData, closeUpdateModal } = useModalsStore((state) => state)

  const [state, formAction] = useFormState(serverAction, {})
  const formRef = useRef<HTMLFormElement | null>(null)
  const [pending, startTransaction] = useTransition()

  const form = useForm({
    defaultValues: { ...updateFormData },
    resolver: zodResolver(formConfig.validationSchema),
  })

  useEffect(() => {
    processInitialValues(updateFormData)
  }, [updateFormData])

  useToastForServerResponse(state)

  useResetFields(state, () => {
    formRef.current?.reset()
    form.reset()
    onClose()
  })

  const onClose = () => closeUpdateModal()

  const processInitialValues = (values: ModalFormData | null) => {
    if (values && Object.keys(values).length) {
      for (const key in values) {
        form.setValue(key, values[key])
      }
    }
  }

  const headerTemplate = () => {
    if (!titleIcon) return <DialogTitle>{title}</DialogTitle>

    const TitleIcon = titleIcon
    return (
      <div className='flex items-center justify-center gap-2'>
        <TitleIcon size={20} />
        <DialogTitle>{title}</DialogTitle>
      </div>
    )
  }

  const renderFields = (formConfig: FormFieldConfig) => {
    const { as, name, label, placeholder, options, accept } = formConfig

    switch (as) {
      case "textarea":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder={placeholder} className='resize-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "color":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='flex w-full items-center gap-2'>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input {...field} type='color' className='w-10 rounded-lg border-0 border-none p-0' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "upload":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
              const file = typeof field.value === "string" ? fromBase64ToFile(field.value) : field.value
              return (
                <FormItem className='w-full'>
                  <Dropzone value={file} onChange={field.onChange} accept={accept} />
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        )
      case "phone":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl ref={withMask("(999) 99 99 99")}>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "multi-select":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={options || []}
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      default:
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={placeholder} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransaction(() => {
      form.handleSubmit(() => {
        formAction(toFormData(form.getValues()))
      })(event)
    })
  }

  return (
    <Dialog modal open={isUpdateModalVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {headerTemplate()}
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form ref={formRef} action={formAction} onSubmit={handleSubmit} className='flex w-full flex-col gap-6'>
            {formConfig.fields.length ? (
              <ul className='flex w-full flex-col gap-4'>
                {formConfig.fields.map((field) => (
                  <li key={field.name}>{renderFields(field)}</li>
                ))}
              </ul>
            ) : null}

            <div className='flex w-full items-center justify-end gap-4'>
              <Button type='button' variant='destructive' onClick={onClose}>
                <IconX className='mr-2 h-4 w-4' />
                Отмена
              </Button>
              <Button type='submit' disabled={pending} variant='success'>
                {pending ? (
                  <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <IconCheck className='mr-2 h-4 w-4' />
                )}
                Сохранить
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateFormModal
