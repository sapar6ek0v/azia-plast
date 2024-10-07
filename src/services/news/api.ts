import type { News } from "@/services/news/entity"
import { NewsProcessor } from "@/services/news/processor"
import type {
  NewsCreateRequest,
  NewsDeleteRequest,
  NewsToggleActivityRequest,
  NewsUpdateRequest,
} from "@/services/news/schemes"
import type { CustomResponse } from "@/services/types"
import { fetchWrapper } from "@/services/wrapper"
import { buildParams } from "@/utils/buildParams"
import { toFormData } from "@/utils/formData"

export class NewsApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<News[]>>("/notice/all", {
      next: { tags: NewsProcessor.getTags() },
      cache: "no-store",
    })
  }

  static async getAllActive() {
    return await fetchWrapper.get<CustomResponse<News[]>>("/notice/all/active", {
      next: { tags: NewsProcessor.getTags() },
      cache: "no-store",
    })
  }

  static async get(newsId: number) {
    return await fetchWrapper.get<CustomResponse<News[]>>(`/notice?noticeId=${newsId}`, { cache: "no-store" })
  }

  static async create(body: NewsCreateRequest) {
    return await fetchWrapper.postMultipart<CustomResponse<News>>("/notice", toFormData(body))
  }

  static async update(body: NewsUpdateRequest) {
    return await fetchWrapper.putMultipart<CustomResponse<News>>("/notice", toFormData(body))
  }

  static async toggleActivity(params: NewsToggleActivityRequest) {
    return await fetchWrapper.put<CustomResponse<News>>(`/notice/activity${buildParams(params)}`)
  }

  static async delete({ id }: NewsDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<boolean>>(`/notice?noticeId=${id}`)
  }
}
