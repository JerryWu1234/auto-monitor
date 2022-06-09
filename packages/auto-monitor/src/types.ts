import type { AxiosRequestConfig, Method } from 'axios'
import type { ContextClass } from './context'
export type Fnnext = () => void
export type Context = FnApp
export interface FnApp {
  use(name: string, fn: (context: ContextClass, next?: Fnnext) => void): FnApp
  handle(context: ContextClass): void
  stack: Array<HandleType>
  run(callback?: FnRunArg): void
}

export type EmptyObj = Record<any, any>

export interface HandleType {
  name: string
  handle: (context: ContextClass, next?: Fnnext) => void
}

export type ContextList = Record<string, Record<any, any>>

export type FnRunArg = (data: Record<any, any>) => Record<any, any>

export interface App {
  url: string
  method?: 'get' | 'GET' | 'post' | 'POST'
  interceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
}

export interface HttpArg {
  method?: Method
  isBeacon?: boolean
  url?: string
  data: Record<any, any>
}
