const { Response } = require("../../commons/dtos/response.dto")

const todos = {
  "6621e6be83244b9b19c2c79f": []
}

const addTodo = (request, h) => {
  const userId = request?.user?.id
  const {
    title, description
  } = request.payload

  const id = todos?.[userId]?.length + 1

  const payload = {
    id,
    title,
    description
  }
  todos[userId].push(payload)
  return new Response({
    data: true,
    status: 200
  })
}

const getTodos = (request, h) => {
  const userId = request?.user?.id
  return new Response({
    data: todos[userId],
    status: 200
  })
}

module.exports = {
  getTodos,
  addTodo
}