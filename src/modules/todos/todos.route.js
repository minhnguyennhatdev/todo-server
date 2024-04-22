const { buildRoute } = require("../../commons/utils/route");

const PREFIX = '/todos';

const routes = [{
  method: 'GET',
  path: '',
  handler: () => null
}]


const route = (server) => {
  routes.forEach(r => server.route(buildRoute(r), PREFIX))
}

module.exports = {
  route
}