const Project = require('../models/project');

// Controller function to create a new project
const createNewProject = async (req, res) => {
  try {
    const projectData = req.body; // Assuming project data is sent in the request body

    // Upload the image to Cloudinary
    const result = await config.cloudinary.uploader.upload(
      projectData.imgLink,
      {
        folder: 'your_folder_name', // Optional: Specify a folder in Cloudinary
      }
    );

    // Update the projectData with the Cloudinary image URL
    projectData.imgLink = result.secure_url;

    // Create a new project with the updated projectData
    const newProject = await Project.create(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to edit an existing project
const editProject = async (req, res) => {
  const projectId = req.params.id; // Assuming project ID is in the request parameters
  try {
    // Check if imgLink is provided in the request body
    if (req.body.imgLink) {
      // Upload the updated image to Cloudinary
      const result = await config.cloudinary.uploader.upload(req.body.imgLink, {
        folder: 'portofolio', // Optional: Specify a folder in Cloudinary
      });

      // Update the req.body with the Cloudinary image URL
      req.body.imgLink = result.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Controller function to delete a project
const deleteProject = async (req, res) => {
  const projectId = req.params.id; // Assuming project ID is in the request parameters
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get all the projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createNewProject,
  editProject,
  deleteProject,
  getAllProjects,
};
