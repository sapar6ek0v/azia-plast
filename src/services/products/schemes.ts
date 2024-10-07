import * as yup from "yup"

export const ProductsBySubcategoryGetSchema = yup.object().shape({
  subcategoryId: yup.number().required(),
  page: yup.number().required(),
  size: yup.number().required(),
})

export type ProductsBySubcategoryGetRequest = yup.InferType<typeof ProductsBySubcategoryGetSchema>

export const ProductCreateSchema = yup.object().shape({})

export type ProductCreateRequest = yup.InferType<typeof ProductCreateSchema>

export const ProductUpdateSchema = ProductCreateSchema.shape({
  id: yup.number().required("Id обязателен для заполнения!"),
})

export type ProductUpdateRequest = yup.InferType<typeof ProductUpdateSchema>
