const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../databases/mysql');

const Todos = sequelize.define('todos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  indexes: [
    {
      name: 'userId_index',
      fields: ['userId']
    }
  ]
});

(async () => {
  await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
})();

module.exports = {
  Todos,
};