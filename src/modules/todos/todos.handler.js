const { HTTPStatus } = require("../../commons/constants")
const { Response } = require("../../commons/dtos/response.dto")
const { Todos, TodoStatus } = require("./models/todos.model")
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
    statusCode: HTTPStatus.OK
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
    statusCode: HTTPStatus.OK
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
    statusCode: HTTPStatus.OK
  })
}

const updateTodo = async (request, h) => {
  const userId = request?.user?.id
  const { id } = request.params
  let {
    title, description, status: _status
  } = request.payload

  title = title?.trim()
  description = description?.trim()
  const status = TodoStatus[_status]

  if (!title?.length) {
    throw Boom.badRequest();
  }

  await Todos.update({
    title,
    description,
    status
  }, {
    where: {
      userId,
      id
    }
  })

  return new Response({
    data: true,
    statusCode: HTTPStatus.OK
  })
}

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
}