const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../databases/mysql');

const Todos = sequelize.define('todos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
})();

module.exports = {
  Todos,
};