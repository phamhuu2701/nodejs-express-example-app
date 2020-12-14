const express = require('express');
const router = express.Router();
const DBControllers = require('../controllers/db');

router.get('/create', DBControllers.create);

module.exports = router;
