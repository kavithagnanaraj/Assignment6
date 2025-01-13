const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

module.exports = app; // Useful for testing or future scaling
