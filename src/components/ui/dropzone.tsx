import { Card, CardContent } from "@/components/ui/card"
import { type ChangeEvent, type Dispatch, type SetStateAction, useRef, useState } from "react"

interface DropzoneProps {
  value: File | File[]
  onChange: Dispatch<SetStateAction<File | File[]>>
  accept?: string
  multiple?: boolean
}

export const Dropzone = ({ value, onChange, multiple = false, accept }: DropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null) // Reference to file input element
  const [files, setFiles] = useState<File[]>([])
  const [fileInfo, setFileInfo] = useState<string | null>(null) // Information about the uploaded file
  const [error, setError] = useState<string | null>(null) // Error message state
  console.log({ value, files })
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.dataTransfer
    handleFiles(files)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    const uploadedFile = files[0]

    // if (fileExtension && !uploadedFile.name.endsWith(`.${fileExtension}`)) {
    //     setError(`Invalid file type. Expected: .${fileExtension}`);
    //     return;
    // }

    setFiles(Array.from(files))
    const fileSizeInKB = Math.round(uploadedFile.size / 1024)

    const fileList = Array.from(files).map((file) => URL.createObjectURL(file))
    onChange(uploadedFile)

    setFileInfo(`Uploaded file: ${uploadedFile.name} (${fileSizeInKB} KB)`)
    setError(null)
  }

  const handleFileChange = () => {
    const fileInput = fileInputRef.current
    if (!fileInput) return

    fileInput.click()
  }

  return (
    <Card className='border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50'>
      <CardContent
        className='flex flex-col items-center justify-center space-y-2 px-2 py-6 text-sm'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileChange}
      >
        <div className='flex items-center justify-center text-muted-foreground'>
          <span className='font-medium'>Перетащите файлы для загрузки или нажмите здесь</span>
          <input
            type='file'
            ref={fileInputRef}
            accept={accept}
            multiple={multiple}
            onChange={handleFileInputChange}
            className='hidden'
          />
        </div>
        {files.length ? (
          <ul className='flex flex-col gap-1'>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        ) : null}
        {error && <span className='text-red-500'>{error}</span>}
      </CardContent>
    </Card>
  )
}
