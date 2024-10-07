export interface Base {
  id: number
}

export interface CustomResponse<T = any> {
  state: CustomResponseStatus
  message: string
  data: T | null
}

export enum CustomResponseStatus {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  ERROR = "ERROR",
  INFO = "INFO",
  DUPLICATE = "DUPLICATE",
  TIME_OUT = "TIME_OUT",
  NETWORK_ERROR = "NETWORK_ERROR",
  CANCELED = "CANCELED",
  SERVER_ERROR = "SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export interface ServerActionState {
  state?: CustomResponseStatus
  message?: string
  data?: any | null
}
