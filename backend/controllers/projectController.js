const { Project } = require("../models");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      UserId: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findByPk(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.destroy();

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};