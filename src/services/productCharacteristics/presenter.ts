import type { ProductCharacteristic } from "@/services/productCharacteristics/entity"
import type { Base } from "@/services/types"

export interface ProductCharacteristicPresenter extends Base {
  name: string
  raw: ProductCharacteristic
}
