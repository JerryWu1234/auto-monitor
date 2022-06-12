import type { EmptyObj, Fnnext } from './types'
import type { ContextClass } from './context'

declare global {
  interface Window { pageClick: (data: EmptyObj) => void }
}

export const event = () => {
  return (context: ContextClass, next?: Fnnext) => {
    const submitData: EmptyObj = {
      event_id: null,
      event_type: 'click',
      client_time: new Date()?.getTime(),
      click_arg: {},
    }
    function pageClick(data: EmptyObj, fn?: (data: EmptyObj) => EmptyObj) {
      submitData.click_arg = data.arg
      submitData.event_id = `${data.event_type}_${data.to}_${data.ctrl_name}`
      context.axios('event', !fn ? submitData : fn(submitData))
    }
    window.pageClick = pageClick
    next && next()
  }
}

