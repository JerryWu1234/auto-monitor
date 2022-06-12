import type { EmptyObj } from './src/types'

declare global {
  interface Window { pageClick: (data: EmptyObj) => void }
}
