const { Response } = require("../../commons/dtos/response.dto")
const { Todos } = require("./models/todos.model")

const todos = {
  "6621e6be83244b9b19c2c79f": []
}

const addTodo = async (request, h) => {
  const userId = request?.user?.id
  const {
    title, description
  } = request.payload

  await Todos.create({
    userId,
    title,
    description
  })

  return new Response({
    data: true,
    status: 200
  })
}

const getTodos = async (request, h) => {
  const userId = request?.user?.id
  const todos = await Todos.findAll({
    where: {
      userId
    }
  })
  return new Response({
    data: todos,
    status: 200
  })
}

const deleteTodo = async (request, h) => {
  const userId = request?.user?.id
  const { id } = request.params
  await Todos.destroy({
    where: {
      userId,
      id
    }
  })
  return new Response({
    data: true,
    status: 200
  })
}

module.exports = {
  getTodos,
  addTodo,
  deleteTodo
}