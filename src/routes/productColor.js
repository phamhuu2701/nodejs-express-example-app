const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productColor');

router.get('/', Controller.find);
router.get('/:_id', Controller.findById);
router.post('/', Controller.create);
router.put('/', Controller.update);
router.delete('/', Controller.delete);

module.exports = router;
