import type { CustomResponse } from "@/services/types"
import type { Vacancy } from "@/services/vacancies/entity"
import { VacanciesProcessor } from "@/services/vacancies/processor"
import type { VacancyCreateRequest, VacancyDeleteRequest, VacancyUpdateRequest } from "@/services/vacancies/schemes"
import { fetchWrapper } from "@/services/wrapper"
import { buildParams } from "@/utils/buildParams"
// TODO: remove CustomResponse from requests
export class VacanciesApi {
  static async getAll() {
    return await fetchWrapper.get<CustomResponse<Vacancy[]>>("/vacancy/all", {
      next: { tags: VacanciesProcessor.getTags(), revalidate: 3600 },
    })
  }

  static async get(vacancyId: number) {
    return await fetchWrapper.get<CustomResponse<Vacancy>>(`/vacancy?vacancyId=${vacancyId}`)
  }

  static async create(body: VacancyCreateRequest) {
    return await fetchWrapper.post<CustomResponse<Vacancy>>(`/vacancy${buildParams(body)}`)
  }

  static async update(body: VacancyUpdateRequest) {
    return await fetchWrapper.put<CustomResponse<Vacancy>>(`/vacancy${buildParams(body)}`)
  }

  static async delete({ id }: VacancyDeleteRequest) {
    return await fetchWrapper.delete<CustomResponse<boolean>>(`/vacancy?vacancyId=${id}`)
  }
}
