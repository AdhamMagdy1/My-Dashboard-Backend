const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Add a default value for the current date and time
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  techUsed: {
    type: Array,
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

// Create and export the Project model
module.exports = Project;
