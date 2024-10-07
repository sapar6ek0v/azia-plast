import type { ProductColor } from "@/services/productColors/entity"
import type { ProductColorPresenter } from "@/services/productColors/presenter"

export class ProductColorsProcessor {
  private static tags = ["product-colors"]

  static getTags() {
    return ProductColorsProcessor.tags
  }

  static getTag() {
    return ProductColorsProcessor.tags[0]
  }

  static toPresenterList(productColors: ProductColor[]) {
    return productColors.map<ProductColorPresenter>((color) => ({
      id: color.id,
      name: color.name,
      hexCode: color.hexCode,
      raw: color,
    }))
  }
}
