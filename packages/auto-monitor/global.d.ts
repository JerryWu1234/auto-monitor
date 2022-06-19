import type { EmptyObj } from './src/types'

declare global {
  interface Window { customEvent: (data: EmptyObj) => void }
}
