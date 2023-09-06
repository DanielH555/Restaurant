const express = require('express');
const router = express.Router();
const { addClient, checkLogin } = require('../controllers/clientsController');

// Route: POST /clients
router.post('/', addClient);

router.post('/login', checkLogin);

module.exports = router;
