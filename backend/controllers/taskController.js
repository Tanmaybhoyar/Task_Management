const { Task } = require("../models");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate,
      ProjectId,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      ProjectId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTaskStatus = async (
  req,
  res
) => {
  try {
    const task = await Task.findByPk(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = req.body.status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};