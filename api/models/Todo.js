const { Sequelize } = require("sequelize");
const db = require("../config/database");
const User = require("./User");

const Todo = db.define("todos", {
  todo_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  checked: {
    type: Sequelize.BOOLEAN,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
  },
});

module.exports = Todo;
