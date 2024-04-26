const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../databases/mysql');

export const TodoStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
}

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
  status: {
    type: DataTypes.ENUM(Object.values(TodoStatus)),
    allowNull: false,
    defaultValue: TodoStatus.TODO,
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