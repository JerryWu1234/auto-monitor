import { describe, expect, it } from 'vitest'
import createMiddle from '../src/index'
describe('test middle', () => {
  it('test use', () => {
    const app = createMiddle()
    app.use('test1', () => {})
    expect(app.stack.length).toBe(1)
  })
})
