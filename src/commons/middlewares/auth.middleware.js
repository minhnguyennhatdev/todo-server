const jwt = require('jsonwebtoken')

const auth = async (request, h) => {
  try {
    const token = request?.headers?.authorization?.replace('Bearer ', '')
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      if (user) {
        delete user.iat
        delete user.exp
        request.user = user
      }
    }
    return h.continue
  } catch (error) {
    console.error(error)
    return h.continue
  }
}

module.exports = {
  auth,
}