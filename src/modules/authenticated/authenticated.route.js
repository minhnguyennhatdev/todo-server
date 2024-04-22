const { authenticated, me } = require('./authenticated.handler');

const PREFIX = '/api/authenticated';

const ROUTE = {
  AUTHENTICATED: `${PREFIX}`,
  ME: `${PREFIX}/me`
}

const route = (server) => {
  // authenticated from sso
  server.route({
    method: 'GET',
    path: ROUTE.AUTHENTICATED,
    handler: authenticated
  });
  server.route({
    method: 'GET',
    path: ROUTE.ME,
    handler: me
  });
}

module.exports = {
  route
}