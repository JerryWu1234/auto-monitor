import type { App, FnApp, Fnnext, HandleType } from './types'
import { ContextClass } from './context'

export const proto = (data: App): FnApp => {
  const context = new ContextClass(data)
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
    handle() {
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
    run() {
      this.handle()
    },
    context,
  }
}
