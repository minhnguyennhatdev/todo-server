const GLOBAL_PREFIX = '/api'

const buildRoute = (route, prefix) => {
  const path = `${GLOBAL_PREFIX ?? ''}${prefix ?? ''}${route.url ?? ''}`
  console.log('Mapped', route.method, path)
  return {
    method: route.method,
    path,
    handler: route.handler,
}
}

module.exports = {
  buildRoute
}