import * as performanceObserver from '@sumup/performance-observer'
import type { IMetricName } from '@sumup/performance-observer'
import type { Fnnext } from '../dist/types'
import type { ContextClass } from './context'
import type { EmptyObj } from './types'

export const performance = () => {
  const data: EmptyObj = {
    'resource-timing': {},
  }

  return (context: ContextClass, next?: Fnnext) => {
    const targetMetrics: IMetricName[] = [
      'first-paint',
      'first-contentful-paint',
      'first-input-delay',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'time-to-first-byte',
      'user-timing',
      'element-timing',
      'resource-timing',
      'navigation-timing',
      'longtask',
    ]

    performanceObserver.observeAll(targetMetrics, ({ name, value, meta }) => {
      if (!data[name])
        data[name] = {}

      if (meta.url)
        data[name][meta.url] = value

      else
        data[name] = value

      setTimeout(() => {
        context.axios('performance', data)
      }, 300)
    })

    next && next()
  }
}
