const express = require('express');
const cors = require('cors');
const config = require('./config/config');

// Initialize Express app
const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cineb API is running',
    version: '1.0.0',
    endpoints: {
      health: '/',
      api: '/api'
    }
  });
});

// API routes placeholder
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API endpoint',
    documentation: 'Add your API routes here'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: config.nodeEnv === 'development' ? err.message : undefined
  });
});

module.exports = app;
