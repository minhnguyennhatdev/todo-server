const { Op } = require("sequelize")
const { HTTPStatus } = require("../../commons/constants")
const { Response } = require("../../commons/dtos/response.dto")
const { Todos, TodoStatus } = require("./models/todos.model")
const Boom = require('@hapi/boom')
const { MAX_CONTENT_LENGTH } = './constants'

const addTodo = async (request, h) => {
  const userId = request?.user?.id
  let {
    title, description, status = TodoStatus.TODO
  } = request.payload

  title = title?.trim()?.slice(0, MAX_CONTENT_LENGTH)
  description = description?.trim()?.slice(0, MAX_CONTENT_LENGTH)
  status = status?.trim()

  if (!title?.length) {
    throw Boom.badRequest();
  }

  await Todos.create({
    userId,
    title,
    description,
    status
  })

  return new Response({
    data: true,
    statusCode: HTTPStatus.OK
  })
}

const getTodos = async (request, h) => {
  const userId = request?.user?.id
  const { page: _page = 1, pageSize: _pageSize = 10, status, search } = request.query

  const page = Number(_page)
  const pageSize = Number(_pageSize)

  const offset = (page - 1) * pageSize
  const limit = Math.min(pageSize + 1, 101)

  const query = {
    where: {
      userId
    },
    order: [
      ['createdAt', 'ASC']
    ],
    limit,
    offset,
  }

  if (status) {
    query.where.status = status
  }

  if (search) {
    query.where.title = {
      [Op.like]: `%${search}%`
    }
  }

  const result = await Todos.findAll(query)

  const hasNext = result?.length > pageSize

  const todos = result.slice(0, pageSize)

  return new Response({
    data: {
      todos,
      hasNext
    },
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
    title, description, status
  } = request.payload

  title = title?.trim()
  description = description?.trim()

  if (!title?.length && !status?.length && !description?.length) {
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