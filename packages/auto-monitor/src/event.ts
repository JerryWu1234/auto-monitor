import type { EmptyObj, Fnnext } from './types'
import type { ContextClass } from './context'

export const event = () => {
  return (context: ContextClass, next?: Fnnext) => {
    const submitData: EmptyObj = {
      event_id: null,
      event_type: 'click',
      client_time: new Date()?.getTime(),
      click_arg: {},
      consoleType: 'click',
    }
    function pageClick(data: EmptyObj, fn?: (data: EmptyObj) => EmptyObj) {
      submitData.click_arg = data.arg
      submitData.consoleType = data.event_type
      submitData.event_type = data.event_type
      submitData.event_id = `${data.event_type}_${context.contextData.to}_${data.ctrl_name}`
      context.axios('event', !fn ? submitData : fn(submitData))
    }
    window.pageClick = pageClick
    next && next()
  }
}

