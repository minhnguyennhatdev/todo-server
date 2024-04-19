class Response {
  status
  message
  data

  constructor({ status, message, data }) {
    this.status = status
    this.message = message
    this.data = data
  }
}

module.exports = {
  Response
}