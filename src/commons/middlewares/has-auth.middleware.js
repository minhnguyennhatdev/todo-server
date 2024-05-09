const Boom = require('@hapi/boom')

const hasAuth = (req, h) => {
  try {
    if (!req.user) {
      throw Boom.unauthorized();
    }
    return h.continue
  } catch (error) {
    throw Boom.unauthorized();
  }
}

module.exports = {
  hasAuth,
}