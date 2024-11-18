const Sequelize = require("sequelize");

const db = new Sequelize("task_app", "root", "admin", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  timezone: "+03:00",
});

module.exports = db;
