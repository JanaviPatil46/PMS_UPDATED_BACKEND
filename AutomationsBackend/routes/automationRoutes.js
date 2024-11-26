// routes/automationRoutes.js
const express = require('express');
const {
  createAutomation,
 
} = require('../controllers/automationController');

const router = express.Router();

// Routes
router.post('/', createAutomation); // Create a new automation


module.exports = router;
