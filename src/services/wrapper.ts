import { CustomResponseStatus } from "@/services/types"

export const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

class FetchWrapper {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T = any>(url: string, config: { next?: NextFetchRequestConfig } & RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, config)
    return this.handleResponse<T>(response)
  }

  async post<T = any>(url: string, data?: any, config?: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    })
    return (await response.json()) as T
  }

  async postMultipart<T = any>(url: string, formData: FormData, config?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: formData,
      headers: { ...(config?.headers || {}) },
      ...config,
    })

    return this.handleResponse<T>(response)
  }

  async put<T = any>(url: string, data?: any, config?: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    })
    return this.handleResponse<T>(response)
  }

  async putMultipart<T = any>(url: string, formData: FormData, config?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      body: formData,
      headers: { ...(config?.headers || {}) },
      ...config,
    })
    return this.handleResponse<T>(response)
  }

  async delete<T = any>(url: string, config?: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      ...config,
    })
    return await this.handleResponse<T>(response)
  }

  async handleResponse<T>(response: Response): Promise<T> {
    // if (!response.ok) {
    //     const errorResponse = await response.json();
    //     return {...errorResponse, state: CustomResponseStatus.ERROR}
    // }
    return (await response.json()) as T
  }
}

export const fetchWrapper = new FetchWrapper(baseUrl)
