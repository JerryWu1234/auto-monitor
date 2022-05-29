import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { HttpArg } from './types'

export function http(interceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig) {
  const ax = axios.create({
    timeout: 3000,
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

  if (data.methdo === 'get' || data.methdo === 'GET')
    submitData.params = data.data
  else
    submitData.data = data.data

  return http({
    url: data.url,
    method: data.methdo,
    ...submitData,
  })
}

export function sendBeacon(data: Omit<HttpArg, 'isBeacon' | 'methdo'>) {
  const str = formatChange(data)
  return navigator.sendBeacon(`${data.url}?${str}`.replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F'))
}

function formatChange(data: HttpArg['data']) {
  let str = ''
  for (const key of Object.keys(data))
    str += `${key}=${data[key]}&`

  return str
}
