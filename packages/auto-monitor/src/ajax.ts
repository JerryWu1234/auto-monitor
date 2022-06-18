import type { ContextClass } from './context'
import type { Fnnext } from './types'

interface AjaxData {
  method: string
  url: string
  consoleType: string
  ajaxtime: Date | null
}

export const ajaxpluin = () => {
  return (context: ContextClass, next?: Fnnext) => {
    const data: AjaxData = {
      url: '',
      method: '',
      consoleType: 'ajax',
      ajaxtime: null,
    }
    const open = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function (method: string, url: string, ...rest: any[]) {
      data.url = url
      data.method = method
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return open.apply(this, [method, url, ...rest])
    }

    const send = XMLHttpRequest.prototype.send

    XMLHttpRequest.prototype.send = function (...arg: any) {
      if (!data.url.includes(context.argData.url)) {
        data.ajaxtime = new Date()
        context.axios('ajax', data)
      }
      send.apply(this, arg)
    }
    next && next()
  }
}

