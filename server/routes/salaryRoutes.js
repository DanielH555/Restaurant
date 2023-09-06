const express = require('express');
const salaryController = require('../controllers/salaryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Salaries route
router.get('/salaries', authMiddleware.authenticateToken, salaryController.getSalaries);

module.exports = router;