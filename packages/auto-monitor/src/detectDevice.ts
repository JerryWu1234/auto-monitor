import type { IResult } from 'ua-parser-js'
import UAParser from 'ua-parser-js'

function parseUserAgent(): IResult {
  const ClientUAInstance = new UAParser()
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
