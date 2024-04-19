'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
  });

  const modules = fs.readdirSync('./src/modules');
  modules.forEach((module) => {
    const { route } = require(`./modules/${module}/${module}.route.js`);
    route(server);
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
