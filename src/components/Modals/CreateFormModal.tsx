"use client"

import { useResetFields } from "@/components/Modals/hooks/useResetFields"
import type { FormConfig, FormFieldConfig, FormSubmitAction } from "@/components/Modals/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dropzone } from "@/components/ui/dropzone"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useModalsStore } from "@/stores/modals"
import { toFormData } from "@/utils/formData"
import { useToastForServerResponse } from "@/utils/hooks/useToastForServerResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Icon, IconCheck, IconLoader2, IconX } from "@tabler/icons-react"
import React, { type FormEvent, useRef, useTransition } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { withMask } from "use-mask-input"

interface Props {
  title: string
  titleIcon?: Icon
  formConfig: FormConfig
  serverAction: FormSubmitAction
}

const CreateFormModal = ({ title, titleIcon, formConfig, serverAction }: Props) => {
  const { isCreateModalVisible, createFormData, closeCreateModal } = useModalsStore((state) => state)

  const [state, formAction] = useFormState(serverAction, {})
  const formRef = useRef<HTMLFormElement | null>(null)
  const [pending, startTransaction] = useTransition()

  const form = useForm({
    defaultValues: { ...createFormData },
    resolver: zodResolver(formConfig.validationSchema),
  })

  useToastForServerResponse(state)

  useResetFields(state, () => {
    formRef.current?.reset()
    form.reset()
    onClose()
  })

  const onClose = () => closeCreateModal()

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
            render={({ field }) => (
              <FormItem className='w-full'>
                <Dropzone value={field.value} onChange={field.onChange} accept={accept} />
                <FormMessage />
              </FormItem>
            )}
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
      case "select":
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select onValueChange={(value) => field.onChange(+value)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
  console.log(form.getValues())
  return (
    <Dialog modal open={isCreateModalVisible} onOpenChange={onClose}>
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

export default CreateFormModal
