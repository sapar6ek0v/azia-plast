import type { News } from "@/services/news/entity"
import type { NewsPresenter } from "@/services/news/presenter"
import { getBase64DataUrl } from "@/utils/base64"

export class NewsProcessor {
  private static tags = ["news"]

  static getTags() {
    return NewsProcessor.tags
  }

  static getTag() {
    return NewsProcessor.tags[0]
  }

  static toPresenterList(news: News[]) {
    const convertToPresenter = (news: News): NewsPresenter => {
      const imgUrl = getBase64DataUrl(news.noticeImage, news.imageType)

      return {
        id: news.id,
        title: news.title,
        description: news.description,
        isActive: news.isActive,
        createdTime: news.createdTime,
        updatedTime: news.updatedTime,
        imgUrl,
        raw: {
          id: news.id,
          title: news.title,
          description: news.description,
          noticeImage: news.noticeImage,
        },
      }
    }

    return news.map(convertToPresenter)
  }
}
