export const toFormData = (data: Record<string, any>) => {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      formData.append(`${key}[]`, JSON.stringify(value))
    } else if (typeof value === "boolean") {
      formData.append(`${key}boolean`, JSON.stringify(value))
    }
    // else if (typeof value === 'number') {
    // 	formData.append(`${key}number`, JSON.stringify(value))
    // }
    else {
      formData.append(key, value)
    }
  }

  return formData
}

export const fromFormData = (formData: FormData) => {
  const data: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    try {
      // if (key.endsWith("number")) {
      // 	const cleanKey = key.slice(0, -6);
      // 	console.log(cleanKey, value)
      // 	data[cleanKey] = JSON.parse(value);
      // } else
      if (key.endsWith("[]") && typeof value === "string") {
        const cleanKey = key.slice(0, -2)
        data[cleanKey] = JSON.parse(value)
      } else if (key.endsWith("boolean") && typeof value === "string") {
        const cleanKey = key.slice(0, -7)
        data[cleanKey] = JSON.parse(value)
      } else if (value instanceof File) {
        data[key] = value
      } else {
        data[key] = value
      }
    } catch (error) {
      console.error(`Failed to parse value for key "${key}":`, value, error)
      data[key] = value // Fallback to raw value in case of error
    }
  }

  return data
}
