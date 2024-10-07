import type { Product } from "@/services/products/entity"
import type { ProductPresenter } from "@/services/products/presenter"

export class ProductsProcessor {
  private static tags = ["products"]

  static getTags() {
    return ProductsProcessor.tags
  }

  static getTag() {
    return ProductsProcessor.tags[0]
  }

  static toPresenterList(products: Product[]) {
    return products.map<ProductPresenter>((product) => {
      return {
        id: product.id,
        name: product.name,
        idFromFactoryBd: product.idFromFactoryBd,
        raw: {
          id: product.id,
          name: product.name,
          idFromFactoryBd: product.idFromFactoryBd,
        },
      }
    })
  }
}
