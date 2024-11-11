import axios, { AxiosError } from "axios"
import { useCallback, useEffect, useState } from "react"

const API_PREFIX = 'api/v1'
const HOST = 'f274-5-18-176-212.ngrok-free.app'

export const useAxiosPostTrigger = <T = object>({
  protocol = 'https',
  api = API_PREFIX,
  host = HOST,
  route = 'me',
  input = null,
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {

  const [serverError, setServerError] = useState<AxiosError | undefined>()
  const [data, setData] = useState<T | null>()

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (data: any) => {
      const options = {
        headers,
        withCredentials,
      }
      const url = `${protocol}://${host}/${api}/${route}`
      axios
        .post(url, data, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [
      headers,
      withCredentials,
      protocol,
      host,
      api,
      route,
      handleResponseData,
    ],
  )

  const trigger = useCallback(
    (data: any) => {
      setData(null)
      data ? onSubmit(data) : onSubmit(input)
    },
    [input, onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

export const useAxiosPutTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  host = HOST,
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const [baseUrl, setBaseUrl] = useState('')

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | null>()

  useEffect(() => {
    const url = `${protocol}://${host}/${api}`
    setBaseUrl(url)
  }, [api, host, protocol])

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (data: any) => {
      const options = {
        headers,
        withCredentials,
      }
      const params = JSON.stringify({ ...data })
      const url = `${baseUrl}/${route}`
      axios
        .put(url, params, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [baseUrl, handleResponseData, headers, route, withCredentials],
  )

  const trigger = useCallback(
    (data: any) => {
      setData(null)
      onSubmit(data)
    },
    [onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

export const useAxiosDeleteTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  host = HOST,
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const [baseUrl, setBaseUrl] = useState('')

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | null>()

  useEffect(() => {
    const url = `${protocol}://${host}/${api}`
    setBaseUrl(url)
  }, [api, host, protocol])

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (data:any) => {
      const options = {
        data,
        headers,
        withCredentials,
      }
      const url = `${baseUrl}/${route}`
      axios
        .delete(url, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [baseUrl, handleResponseData, headers, route, withCredentials],
  )

  const trigger = useCallback(
    (data: any) => {
      setData(null)
      onSubmit(data)
    },
    [onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

export const useAxiosGetTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  host = HOST,
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | null>()

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (input: any) => {
      const options = {
        data,
        headers,
        withCredentials,
      }
      let url = `${protocol}://${host}/${api}/${route}`
      if (input) url += `/${input}`
      axios
        .get(url, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [
      api,
      data,
      handleResponseData,
      headers,
      host,
      protocol,
      route,
      withCredentials,
    ],
  )

  const trigger = useCallback(
    (input = null) => {
      setData(null)
      onSubmit(input)
    },
    [onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}