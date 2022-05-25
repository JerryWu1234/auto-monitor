import type { Context, FnApp, Fnnext, HandleType } from './types'
const proto: FnApp = {
  use(name: string, fn: (context?: Context, next?: Fnnext) => void): FnApp {
    if (arguments.length !== 2)
      Error('use() must be called with 2 arguments')

    if (typeof name === 'string')
      Error('use() first argument must be a string')

    this.stack.push({
      name,
      handle: fn,
    })

    return this
  },
  handle() {
    let index = 0

    const next = (err?: Error) => {
      const item = this.stack?.[index++]
      if (item !== undefined)
        call(item.handle.bind(this), this, next, err)
    }

    next()
  },
  stack: [],
  run() {
    this.handle()
  },
  data: {},
}

async function call(handle: HandleType['handle'], context: Context, next: (err?: Error) => void, err?: Error) {
  let error = err
  try {
    await handle(context, next)
  }
  catch (e) {
    error = e as Error
  }

  next(error)
}

export default function createMiddle(): FnApp {
  return proto
}

