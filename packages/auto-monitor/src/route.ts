import type { Fnnext } from './types'
import type { ContextClass } from './context'
import { routerMode } from './util'

export type EventsType = 'pushState' | 'replaceState'

export type Events = EventsType | 'pageshow' | 'popstate' | 'visibilitychange' | 'beforeunload' | 'unload'

interface routerObject {
  routeMode: 'hash' | 'history'
  path: string
  pageArg: Record<any, any>
}

interface EventImpl extends Event {
  arguments: any
}

interface CreateRouterImpl {
  routeMode: 'hash' | 'history'
  to: string | null
  toArg: Record<any, any>
  form: string | null
  formArg?: Record<any, any>
  time: number | null
  state?: 0 | 1
}

const bindRoute = (event: EventsType) => {
  const fun = window.history[event]
  const newEvent = new Event(event) as EventImpl
  return (...arg: any) => {
    // vue-router内部关键代码   window.history.replaceState(stateCopy, '', absolutePath)
    if ('scrollRestoration' in window.history && /^\//.test(arg[2]) && event === 'replaceState')
      return
    const apply = fun.apply(window.history, arg)
    newEvent.arguments = arg
    window.dispatchEvent(newEvent)
    return apply
  }
}

function excuseBindRoute() {
  const events: Array<EventsType> = ['pushState', 'replaceState']
  events.forEach((eventName: EventsType) => {
    history[eventName] = bindRoute(eventName)
  })
}
excuseBindRoute()

function excuseEventListent(callback: (eventName: Events, $event: Event) => void) {
  const events: Array<Events> = ['popstate', 'pushState', 'replaceState', 'visibilitychange', 'beforeunload', 'unload']
  events.forEach((eventName: Events) => {
    window.addEventListener(eventName, ($event: Event) => {
      callback(eventName, $event)
    })
  })
}

export const route = () => {
  return (context: ContextClass, next?: Fnnext) => {
    let processingBeforeunload = false
    const data: CreateRouterImpl = {
      form: null,
      formArg: {},
      to: null,
      toArg: {},
      time: 0,
      routeMode: 'hash',
    }
    excuseEventListent((name: Events, $event: Event) => {
      const time = new Date().getTime()
      data.time = time
      switch (name) {
        case 'pushState': pushState($event, data)
          break
        case 'popstate': popstate($event, data)
          break
        case 'replaceState': replaceState($event, data)
          break
        case 'visibilitychange': visibilitychange($event, data)
          break
        case 'beforeunload': beforeunload($event, data)
          break
        case 'unload': unload($event, data)
          break
        default:
          break
      }
    })

    function pushState($event: Event, data: CreateRouterImpl) {
      handleEvent($event, data)
    }

    function popstate($event: Event, data: CreateRouterImpl) {
      handleEvent($event, data)
    }

    function replaceState($event: Event, data: CreateRouterImpl) {
      // The replacement method of mainland vue3
      Promise.resolve(() => {
        if (history.state?.replaced === false)
          return

        handleEvent($event, data)
      })
    }

    function visibilitychange($event: Event, data: CreateRouterImpl) {
      if (document.visibilityState === 'hidden' && processingBeforeunload === false) {
        submitHandle($event, { ...data, time: new Date()?.getTime() }, 1, true)
        switchRouter(data, routerMode() as routerObject)
      }
      if (document.visibilityState === 'visible')

        submitHandle($event, data, 0)
    }

    function beforeunload($event: Event, data: CreateRouterImpl) {
      // 当页面刷新的时候,当前处于beforeunload状态
      processingBeforeunload = true
      submitHandle($event, data, 1, true)
    }

    function unload($event: Event, data: CreateRouterImpl) {
      // 修复页面刷新时会上报，unload和beforeunload 2次离开事件
      if (processingBeforeunload === false)
        beforeunload($event, data)
    }

    function handleEvent($event: Event, data: CreateRouterImpl) {
      if (data.to !== null)
        submitHandle($event, { ...data }, 1)

      switchRouter(data, routerMode() as routerObject)
      // 进入页面上报
      const time = new Date().getTime()
      submitHandle($event, { ...data, time }, 0)
    }

    // 不调用context.commit('form',form),后续需要做链表方式,然后做时间计算
    function switchRouter(data: CreateRouterImpl, path: routerObject) {
      data.form = data.to || null
      data.formArg = data.toArg || null
      data.to = path.path
      data.toArg = path.pageArg
      data.routeMode = path.routeMode
    }

    // came in  page when state was "0", came out page when state was "1"
    function submitHandle($event: Event, data: CreateRouterImpl, state: 0 | 1, isBeacon = false) {
      const o = {
        ...data, state, event: $event.type, consoleType: 'route',
      }
      context.axios('route', o, isBeacon)
    }
    handleEvent({ type: 'pageshow' } as Event, data)
    next && next()
  }
}
