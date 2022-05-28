import type { IResult } from 'ua-parser-js'
import UAParser from 'ua-parser-js'
import type { ContextClass } from './context'
import type { Fnnext } from './types'

const uaparser = new UAParser()

export function setUA(userAgent: string) {
  uaparser.setUA(userAgent)
}

export function parseUserAgent(): IResult {
  const ClientUAInstance = uaparser
  const browser = ClientUAInstance.getBrowser()
  const cpu = ClientUAInstance.getCPU()
  const device = ClientUAInstance.getDevice()
  const engine = ClientUAInstance.getEngine()
  const os = ClientUAInstance.getOS()
  const ua = ClientUAInstance.getUA()
  return {
    browser,
    cpu,
    device,
    engine,
    os,
    ua,
  }
}

export const detectDevice = () => {
  return (context: ContextClass, next?: Fnnext) => {
    const data = parseUserAgent()
    context.dispatch('detectDevice', data)
    next && next()
  }
}
