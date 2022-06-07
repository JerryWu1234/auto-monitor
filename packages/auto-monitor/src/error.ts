import type { Fnnext } from '../dist/types'
import type { ContextClass } from './context'

export const error = () => {
  return (context: ContextClass, next?: Fnnext) => {
    window.addEventListener('error', (event) => {
      context.axios('error', {
        message: event.message,
        filename: event.filename,
        position: `${event.lineno}:${event.colno}`,
        stack: event.error.stack,
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      let message = ''
      let line = 0
      let column = 0
      let file = ''
      let stack = ''
      if (typeof event.reason === 'string')
        message = event.reason

      else if (typeof event.reason === 'object')
        message = event.reason.message

      const reason = event.reason
      if (typeof reason === 'object') {
        if (reason.stack) {
          const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
          if (matchResult) {
            file = matchResult[1]
            line = matchResult[2]
            column = matchResult[3]
          }
          stack = reason.stack
        }
      }

      context.axios('error', {
        message,
        filename: file,
        position: `${line}:${column}`,
        stack,
      })
    })
    next && next()
  }
}
