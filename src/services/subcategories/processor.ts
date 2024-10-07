import type { CategoryPresenter } from "@/services/categories/presenter"
import { CategoriesProcessor } from "@/services/categories/processor"
import type { Subcategory } from "@/services/subcategories/entity"
import type { SubcategoryPresenter } from "@/services/subcategories/presenter"
import { getBase64DataUrl } from "@/utils/base64"

export class SubcategoriesProcessor {
  private static tags = ["subcategories"]

  static getTags() {
    return SubcategoriesProcessor.tags
  }

  static getTag() {
    return SubcategoriesProcessor.tags[0]
  }

  static toPresenterList(subcategories: Subcategory[], categories: CategoryPresenter[]) {
    return subcategories.map<SubcategoryPresenter>((subcategory) => {
      const category = CategoriesProcessor.getById(subcategory.categoryId, categories)

      return {
        id: subcategory.id,
        name: subcategory.name,
        imgUrl: getBase64DataUrl(subcategory.subcategoryImage, subcategory.subcategoryImageType),
        category: category?.name,
        products: [""],
        raw: {
          id: subcategory.id,
          name: subcategory.name,
          categoryId: subcategory.categoryId,
          subcategoryImage: subcategory.subcategoryImage,
        },
      }
    })
  }
}
