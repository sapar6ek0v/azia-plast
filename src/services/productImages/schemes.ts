import * as yup from "yup"

export const ProductImageCreateSchema = yup.object().shape({
  productId: yup.number().required("Выберите продукт!"),
  colorId: yup.number().required("Выберите цвета продукта!"),
  productImage: yup.mixed<File>().required("Выберите изображения!"),
})

export type ProductImageCreateRequest = yup.InferType<typeof ProductImageCreateSchema>

export const ProductImageUpdateSchema = ProductImageCreateSchema.shape({
  id: yup.number().required("Id обязателен для заполнения!"),
})

export type ProductImageUpdateRequest = yup.InferType<typeof ProductImageUpdateSchema>
