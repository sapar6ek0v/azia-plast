import type { ProductCharacteristic } from "@/services/productCharacteristics/entity"
import { ProductCharacteristicProcessor } from "@/services/productCharacteristics/processor"
import type {
  ProductCharacteristicCreateRequest,
  ProductCharacteristicDeleteRequest,
  ProductCharacteristicUpdateRequest,
} from "@/services/productCharacteristics/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"

export class ProductCharacteristicsApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<ProductCharacteristic[]>>("/characteristic/all", {
      next: {
        tags: ProductCharacteristicProcessor.getTags(),
        revalidate: 3600,
      },
    })
  }

  static async get(characteristicId: number) {
    return await fetchWrapper.get<CustomResponse<ProductCharacteristic>>(
      `/characteristic?characteristicId=${characteristicId}`,
    )
  }

  static async create(body: ProductCharacteristicCreateRequest) {
    return await fetchWrapper.post<CustomResponse<ProductCharacteristic>>("/characteristic", body)
  }

  static async update(body: ProductCharacteristicUpdateRequest) {
    return await fetchWrapper.put<CustomResponse<ProductCharacteristic>>("/characteristic", body)
  }

  static async delete({ id }: ProductCharacteristicDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<ProductCharacteristic>>(`/characteristic?characteristicId=${id}`)
  }
}
