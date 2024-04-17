const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Todo = require("./Todo");

const User = db.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

User.hasMany(Todo, { as: "todos", foreignKey: "user_id" });

module.exports = User;
