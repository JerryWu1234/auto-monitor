import type { ContextList } from './types'
export class ContextClass {
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
}
