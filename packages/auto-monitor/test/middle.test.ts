import { beforeEach, describe, expect, it } from 'vitest'
import createMiddle from '../src/index'
import { detectDevice, setUA } from '../src/detectDevice'
beforeEach(() => {
  setUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36')
})
describe('test middle', () => {
  it('test parseUserAgent and test detectdevice middle', () => {
    const app = createMiddle({ url: 'http://localhost:3000' })
    app.use('detectDevice', detectDevice())
    app.run()
    expect(app.stack.length).toBe(1)
  })
})
