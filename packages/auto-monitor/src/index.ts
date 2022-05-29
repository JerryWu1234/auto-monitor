import type { App, FnApp } from './types'
import { proto } from './middle'

export default function monitor(data: App): FnApp {
  const app = proto(data)
  return app
}

