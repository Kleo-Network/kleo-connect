import { useEffect, useState } from 'react'
import { Method } from 'axios'
import { useNavigate } from 'react-router-dom'

type Options<T> = {
  method?: Method
  body?: BodyInit | null
  headers?: HeadersInit
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  redirect?: RequestRedirect
  referrerPolicy?: ReferrerPolicy
  integrity?: string
  signal?: AbortSignal
  keepalive?: boolean
  onSuccessfulFetch?: (data?: T) => void
}

type FetchResponse<T> = {
  data: T | null
  status: FetchStatus
  error: any
  fetchData: (url: string, options?: Options<T>) => void
}
export const baseUrl =
  'http://127.0.0.1:5001/api/v1/core' || 'https://api.kleo.network/api/v1/core'

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  PROCESSING = 'processing'
}

function useFetch<T>(url?: string, options?: Options<T>): FetchResponse<T> {
  const navigate = useNavigate()

  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState(FetchStatus.IDLE)
  const [error, setError] = useState(null)
  const [controller, setController] = useState<AbortController | null>(null)
  const baseUrl =
    'http://127.0.0.1:5001/api/v1/core' ||
    'https://api.kleo.network/api/v1/core'

  function getToken(): string | undefined {
    const token = sessionStorage.getItem('token')
    if (token) {
      return token
    } else {
      return ''
    }
  }

  const fetchData = async (url: string, options?: Options<T>) => {
    if (url === '') {
      return
    }
    const token = getToken()
    setStatus(FetchStatus.LOADING)
    options = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: token || ''
      }
    }

    fetch(`${baseUrl}/${url}`, {
      method: options?.method || 'GET',
      body: options?.body || null,
      headers: options?.headers,
      mode: options?.mode || 'cors',
      cache: options?.cache || 'default',
      credentials: options?.credentials || 'same-origin',
      redirect: options?.redirect || 'follow',
      referrerPolicy: options?.referrerPolicy || 'no-referrer',
      integrity: options?.integrity || '',
      keepalive: options?.keepalive || false,
      signal: options?.signal
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Could not fetch data for that resource')
        }
        return response.json()
      })
      .then((data) => {
        setData(data)
        setStatus(FetchStatus.SUCCESS)
        if (options?.onSuccessfulFetch) {
          options.onSuccessfulFetch(data)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setStatus(FetchStatus.ERROR)
        }
      })
  }

  const fetchDataManually = (url: string, options?: Options<T>) => {
    if (controller) {
      controller.abort()
    }
    const newController = new AbortController()
    setController(newController)
    fetchData(url || '', { ...(options || {}), signal: newController.signal })
  }

  useEffect(() => {
    if (controller) {
      controller.abort()
    }
    const newController = new AbortController()
    setController(newController)
    fetchData(url || '', { ...(options || {}), signal: newController.signal })

    return () => {
      newController.abort()
    }
  }, [])

  return { data, status, error, fetchData: fetchDataManually }
}

export default useFetch
