const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
})

module.exports = {
  sequelize
}