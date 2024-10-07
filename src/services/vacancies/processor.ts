import type { Vacancy } from "@/services/vacancies/entity"
import type { VacancyPresenter } from "@/services/vacancies/presenter"

export class VacanciesProcessor {
  private static tags = ["vacancies"]

  static getTags() {
    return VacanciesProcessor.tags
  }

  static getTag() {
    return VacanciesProcessor.tags[0]
  }

  static async toPresenterList(vacancies: Vacancy[]) {
    return vacancies.map<VacancyPresenter>((vacancy) => ({
      id: vacancy.id,
      name: vacancy.name,
      description: vacancy.description,
      offer: vacancy.offer,
      raw: vacancy,
    }))
  }
}
