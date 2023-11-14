const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const projectController = require('../controllers/projectController');

// Middleware to validate project data
const validateProject = [
  check('name').notEmpty().withMessage('Name is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('link').notEmpty().withMessage('Link is required'),
  check('date').isISO8601().toDate().withMessage('Invalid date format'),
  check('imgLink').notEmpty().withMessage('Image Link is required'),
  check('techUsed').isArray().withMessage('Tech Used must be an array'),
  validationMiddleware, // Use the validation middleware to check for errors
];

// Create a new project
router.post('/projects', validateProject, projectController.createNewProject);

// Edit an existing project
router.put('/projects/:id', validateProject, projectController.editProject);

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Delete a project by ID
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
