export type Fnnext = () => void
export type Context = FnApp
export interface FnApp {
  use(name: string, fn: (context?: Context, next?: Fnnext) => void): FnApp
  handle(): void
  stack: Array<HandleType>
  run(): void
  data: Record<any, any>
}

export interface HandleType {
  name: string
  handle: (context: FnApp, next?: Fnnext) => void
}
