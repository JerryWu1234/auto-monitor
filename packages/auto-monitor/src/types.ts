import type { AxiosRequestConfig, Method } from 'axios'
import type { ContextClass } from './context'
export type Fnnext = () => void
export type Context = FnApp
export interface FnApp {
  use(name: string, fn: (context: ContextClass, next?: Fnnext) => void): FnApp
  handle(): void
  stack: Array<HandleType>
  run(callback: FnRunArg): void
  context: ContextClass
}

export interface HandleType {
  name: string
  handle: (context: ContextClass, next?: Fnnext) => void
}

interface TypeContextData {
  name: string
  pluginData: Record<any, any>
}

export type ContextList = Array<TypeContextData>

type FnRunArg = (data: Record<any, any>) => Record<any, any>

export interface App {
  url: string
  sentingData: FnRunArg
  interceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
}

export interface HttpArg {
  methdo: Method
  isBeacon?: boolean
  url: string
  data: Record<any, any>
}
