const { HTTPStatus } = require('../constants')
const { Response } = require('../dtos/response.dto')
const Boom = require('@hapi/boom')

const hasAuth = (req, h) => {
  try {
    console.log('Boom', req.user, Boom)
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