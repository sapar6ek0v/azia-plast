import type { FormSelectOption } from "@/components/Modals/types"
import type { Category } from "@/services/categories/entity"
import type { CategoryPresenter } from "@/services/categories/presenter"
import { getBase64DataUrl } from "@/utils/base64"

export class CategoriesProcessor {
  private static tags = ["categories"]

  static getTags() {
    return CategoriesProcessor.tags
  }

  static getTag() {
    return CategoriesProcessor.tags[0]
  }

  static toPresenterList(categories: Category[]) {
    return categories.map<CategoryPresenter>((category) => {
      const imgUrl = getBase64DataUrl(category.categoryImage, category.imageType)

      return {
        id: category.id,
        name: category.name,
        imgUrl,
        subcategories: category.subcategories.map(({ name }) => name),
        raw: {
          id: category.id,
          name: category.name,
          multipartFile: category.categoryImage,
        },
      }
    })
  }

  static toSelectorOptions(categories: CategoryPresenter[]): FormSelectOption[] {
    return categories.map(({ id, name }) => ({ value: id, label: name, numericValue: id }))
  }

  static getById(id: number, categories: CategoryPresenter[]) {
    return categories.find((category) => category.id === id) || null
  }
}
