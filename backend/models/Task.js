const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM(
      "todo",
      "in-progress",
      "completed"
    ),
    defaultValue: "todo",
  },

  priority: {
    type: DataTypes.ENUM(
      "low",
      "medium",
      "high"
    ),
    defaultValue: "medium",
  },

  dueDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Task;