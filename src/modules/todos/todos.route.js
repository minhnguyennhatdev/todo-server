const { hasAuth } = require("../../commons/middlewares/has-auth.middleware");
const { buildRoute } = require("../../commons/utils/route.util");
const { addTodo, getTodos, deleteTodo } = require("./todos.handler");

const PREFIX = '/todos';

const routes = [{
  method: 'POST',
  path: '',
  handler: addTodo,
  config: {
    pre: [
      { method: hasAuth, assign: 'm1' }
    ]
  },
}, {
  method: 'GET',
  path: '',
  handler: getTodos,
  config: {
    pre: [
      { method: hasAuth, assign: 'm1' }
    ]
  },
}, {
  method: 'DELETE',
  path: '/{id}',
  handler: deleteTodo,
  config: {
    pre: [
      { method: hasAuth, assign: 'm1' }
    ]
  }
}]

const route = (server) => {
  routes.forEach(r => server.route(buildRoute(r, PREFIX)))
}

module.exports = {
  route
}