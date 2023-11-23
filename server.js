const express = require('express');
const app = express();
const { connectToDatabase } = require('./config/config');
const { errorHandler } = require('./utils/error');
// Middleware for body parsing (JSON and form data)
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Logging Middleware (optional)
const morgan = require('morgan');
app.use(morgan('dev'));

// Load environment variables
require('dotenv').config();

// Connect to the MongoDB Atlas database
connectToDatabase();
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectsRoutes');

// Routes
app.use('/auth', authRoutes); // Use the auth routes
app.use('/api', projectRoutes); // Use the project routes (or your existing routes)
// Error handling middleware
// Ping endpoint
app.get('/ping', (req, res) => {
  res.status(200).send('Server is up and running!');
});
app.use(errorHandler); // Use the error handling middleware at the end of your middleware stack

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
