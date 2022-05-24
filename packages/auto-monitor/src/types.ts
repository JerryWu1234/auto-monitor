export type Fnnext = (next: Fnnext) => void
export type Context = Record<any, any>
export interface FnApp {
  use(name: string, fn: (context: Context) => void): void
  handle(): void
  stack: Array<HandleType>
  run(): void
  data: Record<any, any>
}

interface HandleType {
  name: string
  handle: (context: Record<any, any>) => void
}
