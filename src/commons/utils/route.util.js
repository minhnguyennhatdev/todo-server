const GLOBAL_PREFIX = '/api'

const buildRoute = (route, prefix) => {
  const { method, path, handler, config } = route
  const builtPath = `${GLOBAL_PREFIX ?? ''}${prefix ?? ''}${path ?? ''}`
  console.log('Mapped', method, builtPath)
  return {
    method,
    path: builtPath,
    handler,
    config
}
}

module.exports = {
  buildRoute
}