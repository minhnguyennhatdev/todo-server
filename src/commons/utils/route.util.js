const Boom = require("@hapi/boom")

const GLOBAL_PREFIX = '/api'

const buildRoute = (route, prefix) => {
  const { method, path, handler, config } = route
  const builtPath = `${GLOBAL_PREFIX ?? ''}${prefix ?? ''}${path ?? ''}`
  const buildHandler = async (req, h) => {
    try {
      return await handler(req, h)
    } catch (error) {
      console.error(error)
      throw Boom.badImplementation()
    }
  }
  return {
    method,
    path: builtPath,
    handler: buildHandler,
    config
}
}

module.exports = {
  buildRoute
}