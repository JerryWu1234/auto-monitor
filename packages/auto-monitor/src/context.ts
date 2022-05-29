import { http, sendAxios, sendBeacon } from './http'
import type { App, ContextList, HttpArg } from './types'
export class ContextClass {
  constructor(app: App) {
    this.argData = app
    this.http = http(app?.interceptors)
  }

  private argData: App
  public http
  private data: ContextList = []
  private hooks: Record<string, Array<(...arg: any) => void>> = {}

  public dispatch(name: string, pluginData: Record<any, any>) {
    if (name && typeof pluginData === 'object')
      throw new Error('argument error')

    this.data.push({
      name,
      pluginData,
    })
  }

  public $on(name: string, fn: (...arg: any[]) => void) {
    (this.hooks[name] || (this.hooks[name] = [])).push(fn)
  }

  public $emit(name: string, ...args: any[]) {
    (this.hooks[name] || []).forEach(fn => fn(...args))
  }

  public $off(name: string, fn: (...arg: any[]) => void) {
    const hooks = this.hooks[name]
    if (hooks) {
      const index = hooks.indexOf(fn)
      if (index > -1)
        hooks.splice(index, 1)
    }
  }

  public send(data: HttpArg) {
    if (data.isBeacon)
      return sendBeacon(data)

    else
      return sendAxios(data, this.http)
  }
}
