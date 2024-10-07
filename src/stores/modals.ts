import { createBoundedUseStore } from "@/stores/hooks"
import { devtools } from "zustand/middleware"
import { createStore } from "zustand/vanilla"

export type ModalFormData = Record<string, any>

interface ModalsState {
  isCreateModalVisible: boolean
  createFormData: ModalFormData | null
  openCreateModal: (formData?: ModalFormData) => void
  closeCreateModal: () => void

  isUpdateModalVisible: boolean
  updateFormData: ModalFormData | null
  openUpdateModal: (formData: ModalFormData) => void
  closeUpdateModal: () => void
}

export const modalsStore = createStore<ModalsState>()(
  devtools((set) => ({
    isCreateModalVisible: false,
    createFormData: null,
    isUpdateModalVisible: false,
    updateFormData: null,

    openCreateModal: (formData) =>
      set(() => ({
        isCreateModalVisible: true,
        createFormData: formData || null,
      })),
    closeCreateModal: () =>
      set(() => ({
        isCreateModalVisible: false,
        createFormData: null,
      })),

    openUpdateModal: (formData) =>
      set(() => ({
        isUpdateModalVisible: true,
        updateFormData: formData,
      })),
    closeUpdateModal: () =>
      set(() => ({
        isUpdateModalVisible: false,
        updateFormData: null,
      })),
  })),
)

export const useModalsStore = createBoundedUseStore(modalsStore)
