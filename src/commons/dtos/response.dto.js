class Response {
  statusCode
  message
  data

  constructor({ statusCode, message, data }) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}

module.exports = {
  Response
}