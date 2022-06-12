import { http, sendAxios, sendBeacon } from './http'
import type { App, ContextList, EmptyObj, FnRunArg, HttpArg } from './types'
export class ContextClass {
  constructor(app: App, callback?: FnRunArg) {
    this.argData = app
    this.http = http(app.url, app.interceptors)
    this.callback = callback
  }

  private callback?: FnRunArg
  private argData: App
  public http
  private data: ContextList[] = []
  private hooks: Record<string, Array<(...arg: any) => void>> = {}

  public dispatch(name: string, pluginData: EmptyObj) {
    if (!name && typeof pluginData !== 'object')
      throw new Error('argument error')
    const index = this.data.findIndex(item => item[name] !== undefined)
    if (index > -1) {
      this.data.splice(index, 1)
      this.data.unshift({ [name]: pluginData })
    }
    else {
      this.data.unshift({ [name]: pluginData })
    }
  }

  get contextData() {
    const v = Object.values(this.data).reduce((a: any, item: ContextList) => {
      return { ...a, ...Object.values(item)[0] }
    }, {})
    return v
  }

  set contextData(newVal: any) {
    throw new Error('contextData is readonly')
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

  private send(data: HttpArg) {
    if (data.isBeacon)
      return sendBeacon(data)
    else
      return sendAxios(data, this.http)
  }

  public axios(name: string, data: EmptyObj, isBeacon = false) {
    this.dispatch(name, data)
    const obj = this.callback?.call(null, this.contextData) || {}
    if (typeof obj !== 'object')
      throw new Error('callback must return an object')

    this.send({
      isBeacon,
      data: obj,
      url: this.argData.url,
      method: this.argData.method || 'post',
    })
  }
}
