import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { HttpArg } from './types'

export function http(baseUrl: string, interceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig) {
  const ax = axios.create({
    timeout: 3000,
    baseURL: baseUrl,
  })
  ax.interceptors.request.use((config) => {
    if (interceptors)
      return interceptors.call(ax, config)
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  return ax
}

export function sendAxios(data: HttpArg, http: AxiosInstance) {
  const submitData: Record<any, any> = {}

  if (data.method === 'get' || data.method === 'GET')
    submitData.params = data.data
  else
    submitData.data = data.data
  return http({
    url: data.url,
    method: data.method,
    ...submitData,
  })
}

export function sendBeacon(data: Omit<HttpArg, 'isBeacon' | 'method'>) {
  const str = formatChange(data.data)
  return navigator.sendBeacon(`${data.url}?${str}`)
}

function formatChange(data: HttpArg['data']) {
  let str = ''
  for (const key of Object.keys(data)) {
    if (typeof data[key] === 'object')
      str += `${key}=${JSON.stringify(data[key])}&`

    else
      str += `${key}=${data[key]}&`
  }

  return str
}
