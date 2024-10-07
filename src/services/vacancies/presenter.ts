import type { Base } from "@/services/types"
import type { Vacancy } from "@/services/vacancies/entity"

export interface VacancyPresenter extends Base {
  name: string
  description: string
  offer: string
  raw: Vacancy
}
