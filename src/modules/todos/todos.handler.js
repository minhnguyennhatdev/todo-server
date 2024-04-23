const { Response } = require("../../commons/dtos/response.dto")
const { Todos } = require("./models/todos.model")
const Boom = require('@hapi/boom')

const addTodo = async (request, h) => {
  const userId = request?.user?.id
  let {
    title, description
  } = request.payload

  title = title?.trim()
  description = description?.trim()

  if (!title?.length) {
    throw Boom.badRequest();
  }

  const todo = await Todos.create({
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