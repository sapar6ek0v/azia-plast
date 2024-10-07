interface Params {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

export const buildParams = (params: Params) => {
  let queryString = ""

  for (const key in params) {
    queryString = `${queryString}${key}=${params[key]}&`
  }

  if (queryString.length > 0) {
    queryString = `?${queryString.substring(0, queryString.length - 1)}`
  }

  return queryString
}
