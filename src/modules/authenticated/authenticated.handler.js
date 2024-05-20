const Boom = require('@hapi/boom')
const { HTTPStatus } = require('../../commons/constants')
const { Response } = require('../../commons/dtos/response.dto')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const ssoAxios = axios.create({
  baseURL: process.env.SSO_SERVER_URL,
  validateStatus: () => true
})

const authenticated = async (request) => {
  try {

    const token = request?.query?.token
    if (!token) {
      throw Boom.unauthorized();
    }

    const { data } = await ssoAxios.get(`/dev/authenticated?token=${token}`)
    const user = data?.data

    console.log('user authenticated: ', user)

    if (!user) {
      throw Boom.unauthorized();
    }

    const jwtToken = jwt.sign(user, process.env.JWT_SECRET)

    return new Response({
      statusCode: HTTPStatus.OK,
      message: 'Authenticated',
      data: {
        token: jwtToken
      }
    })
  } catch (error) {
    console.error(error)
    throw Boom.unauthorized();
  }
}

const me = async (request) => {
  try {
    const user = request?.user
    if (!user) {
      throw Boom.unauthorized();
    }
    return new Response({
      statusCode: HTTPStatus.OK,
      message: 'Authenticated',
      data: user
    })
  } catch (error) {
    console.error(error)
    throw Boom.unauthorized();
  }
}

module.exports = {
  authenticated,
  me
}