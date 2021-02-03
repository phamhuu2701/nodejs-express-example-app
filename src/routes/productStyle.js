const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productStyle');
const UserValidator = require('../validator/user');

router.get('/', Controller.find);
router.get('/:_id', Controller.findById);
router.post('/', UserValidator.authorization, Controller.create);
router.put('/', UserValidator.authorization, Controller.update);
router.delete('/', UserValidator.authorization, Controller.delete);

module.exports = router;
