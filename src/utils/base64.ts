interface Signatures {
  [key: string]: string
}

const signatures: Signatures = {
  "89504E47": "image/png", // PNG
  "47494638": "image/gif", // GIF
  FFD8FFDB: "image/jpeg", // JPEG
  FFD8FFE0: "image/jpeg", // JPEG
  FFD8FFE1: "image/jpeg", // JPEG
  "424D": "image/bmp", // BMP
  "49492A00": "image/tiff", // TIFF
  "4D4D002A": "image/tiff", // TIFF
  "52494646": "image/webp", // WebP
  "3C737667": "image/svg+xml", // SVG (начинается с "<svg")
  "00000100": "image/vnd.microsoft.icon", // ICO (начинается с "00 00 01 00")
  "504B0304": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX (начинается с "PK")
  D0CF11E0: "application/msword", // DOC (начинается с "ÐÏ"
  "25504446": "application/pdf", // PDF (начинается с "%PDF")
}

export const getMimeTypeFromSignature = (bytes: Uint8Array) => {
  const hexSignature = bytes
    .slice(0, 4)
    .reduce((acc, byte) => acc + byte.toString(16).toUpperCase().padStart(2, "0"), "")
  return signatures[hexSignature] || "application/octet-stream"
}

export const getMimeTypeFromBase64 = (base64String: string) => {
  const binaryString = atob(base64String)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const blob = new Blob([bytes])
  return blob.type || getMimeTypeFromSignature(bytes)
}

export const getBase64DataUrl = (base64String: string, fileType?: string | null) =>
  `data:${fileType || getMimeTypeFromBase64(base64String)};base64,${base64String}`

export const fromBase64ToFile = (base64String: string, fileName = "", fileType?: string) => {
  const binaryString = atob(base64String)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const blob = new Blob([bytes], { type: fileType || getMimeTypeFromBase64(base64String) })

  return new File([blob], fileName, { type: blob.type })
}
