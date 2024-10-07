import { useEffect, useState } from "react"

interface UseQueryOptions {
  enabled?: boolean
}

interface UseQueryReturn<T> {
  data: T | null
  error: string | null
  isLoading: boolean
  refetch: () => void
}

export function useQuery<T>(fetchFunction: () => Promise<T>, options?: UseQueryOptions): UseQueryReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(!!options?.enabled)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFunction()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData()
    }
  }, [options?.enabled])

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  }
}
