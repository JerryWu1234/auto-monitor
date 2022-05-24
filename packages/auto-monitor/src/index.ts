import type { Context, FnApp, Fnnext } from './types'
const proto: FnApp = {
  use(name: string, fn: (context: Context) => void) {
    if (arguments.length !== 2)
      Error('use() must be called with 2 arguments')
    this.stack.push({
      name,
      handle: fn,
    })
  },
  handle() { },
  stack: [],
  run() { },
  data: {},
}

export default function createMiddle(): FnApp {
  return proto
}

