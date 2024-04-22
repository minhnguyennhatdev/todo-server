const { buildRoute } = require('../../commons/utils/route.util');
const { authenticated, me } = require('./authenticated.handler');

const PREFIX = '/authenticated';

const routes = [{
  method: 'GET',
  path: '',
  handler: authenticated
}, {
  method: 'GET',
  path: '/me',
  handler: me
}]

const route = (server) => {
  routes.forEach(r => { r.url = `${PREFIX}${r.path}`; return server.route(buildRoute(r, PREFIX)) })
}

module.exports = {
  route
}