const { addTodo } = require("./todos.handler");

const PREFIX = '/todos';

const ROUTE = {
  GET_ALL: PREFIX + '',
  ADD: PREFIX + ''
}

const route = (server) => {
  // get all todos
  server.route({
    method: 'GET',
    path: ROUTE.ADD,
    handler: (request, h) => {
      return 'Hello World!';
    }
  });

  // add todo
  server.route({
    method: 'POST',
    path: PREFIX + '/',
    handler: addTodo
  });
}

module.exports = {
  route
}