import type { EmptyObj } from './types'

const hashRouter = () => {
  const hashRouter = window.location.hash

  const path = hashRouter.split('#')[1]
  if (path.includes('?')) {
    const l = path.split('?')
    return {
      path: l?.[0],
      pageArg: getHashParam(l?.[1]),
    }
  }
  return {
    path,
    pageArg: {},
  }
}

const historyRouter = (path?: string) => {
  const pathName = path || window.location.pathname

  return {
    path: pathName,
    pageArg: getHistorySearch(location.search),
  }
}

function getHashParam(StringObject: string) {
  const o: EmptyObj = {}
  if (!StringObject)
    return o

  const list = StringObject?.split('&')

  for (let i = 0; i < list.length; i++) {
    const keyValue = list[i].split('=')
    o[keyValue[0]] = keyValue[1]
  }

  return o
}

function getHistorySearch(StringObject: string) {
  const o: EmptyObj = {}
  const searchObject = StringObject?.substring(1)

  if (!searchObject)
    return o

  const list = searchObject?.split('&')

  for (let i = 0; i < list.length; i++) {
    const keyValue = list[i].split('=')
    o[keyValue[0]] = keyValue[1]
  }

  return o
}

export const routerMode = () => window.location.href.includes('#') ? hashRouter() : historyRouter()

