import type { App, FnApp } from './types'
import { proto } from './middle'
export { detectDevice } from './detectDevice'
export { error } from './error'
export { route } from './route'
export { performance } from './performance'
export { event } from './event'
export { ajaxpluin } from './ajax'
export function monitor(data: App): FnApp {
  const app = proto(data)
  return app
}

