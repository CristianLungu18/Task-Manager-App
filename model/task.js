const db = require("../config/database");
const { DataTypes } = require("sequelize");

const Task = db.define("tasks", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.STRING,
    defaultValue: "off",
  },
});

module.exports = Task;
