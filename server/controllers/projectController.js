import Project from '../models/Project.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name , description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Project name is required' });
    }

    const newProject = new Project({ name , description});
    await newProject.save();

    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Project
export const deleteProject = async (req, res) => {
    try {
      const deleted = await Project.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Project not found" });
      res.json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  const { html, css } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { html, css },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated", project });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
