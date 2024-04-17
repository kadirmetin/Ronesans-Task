const Sequelize = require("sequelize");

module.exports = new Sequelize(
  process.env.DB,
  process.env.UN,
  process.env.PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
