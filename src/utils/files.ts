const fileSizeTypes: string[] = ["Б", "Кб", "Мб", "Гб", "Тб", "Пб", "Эб", "Зб", "Йб"]

export const formatSize = (bytes: number) => {
  const k = 1024
  const dm = 2

  if (bytes === 0) return `0 ${fileSizeTypes[0]}`

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = Number.parseFloat((bytes / k ** i).toFixed(dm))

  return `${formattedSize} ${fileSizeTypes[i]}`
}
