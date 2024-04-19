const { authenticated } = require('./authenticated.handler');

const PREFIX = '/authenticated';

const route = (server) => {
  // authenticated from sso
  server.route({
    method: 'GET',
    path: PREFIX,
    handler: authenticated
  });
}

module.exports = {
  route
}