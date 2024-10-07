import type { ProductCharacteristic } from "@/services/productCharacteristics/entity"
import type { ProductCharacteristicPresenter } from "@/services/productCharacteristics/presenter"

export class ProductCharacteristicProcessor {
  private static tags = ["product-characteristics"]

  static getTags() {
    return ProductCharacteristicProcessor.tags
  }

  static getTag() {
    return ProductCharacteristicProcessor.tags[0]
  }

  static toPresenterList(productColors: ProductCharacteristic[]) {
    return productColors.map<ProductCharacteristicPresenter>((characteristic) => ({
      id: characteristic.id,
      name: characteristic.name,
      raw: characteristic,
    }))
  }
}
