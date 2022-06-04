import type { App, FnApp, FnRunArg, Fnnext, HandleType } from './types'
import { ContextClass } from './context'

export const proto = (data: App): FnApp => {
  return {
    use(name: string, fn: (context: ContextClass, next?: Fnnext) => void): FnApp {
      if (arguments.length !== 2)
        throw (new Error('use() must be called with 2 arguments'))

      if (typeof name !== 'string')
        throw (new Error('use() first argument must be a string'))

      this.stack.push({
        name,
        handle: fn,
      })

      return this
    },
    handle(context: ContextClass) {
      const compose = (middleList: Array<HandleType>) => {
        const dispatch = (i: number) => {
          const middle = middleList?.[i++]
          if (middle !== undefined) {
            try {
              middle.handle(context, dispatch.bind(this, i))
            }
            catch (e) {
              console.error(e)
            }
          }
        }
        return dispatch(0)
      }

      compose(this.stack)
    },
    stack: [],
    run(callback: FnRunArg) {
      const context = new ContextClass(data, callback)
      this.handle(context)
    },
  }
}
