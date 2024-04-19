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
      return new Response({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      })
    }

    const { data } = await ssoAxios.get(`/dev/authenticated?token=${token}`)
    const user = data?.data

    if(!user) {
      return new Response({
        status: HTTPStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      })
    }

    const jwtToken = jwt.sign(user, process.env.JWT_SECRET)


    return new Response({
      status: HTTPStatus.OK,
      message: 'Authenticated',
      data: {
        token: jwtToken
      }
    })
  } catch (error) {
    console.error(error)
    return new Response({
      status: HTTPStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    })
  }
}

module.exports = {
  authenticated
}