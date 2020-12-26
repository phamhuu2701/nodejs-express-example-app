const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');
const UserValidator = require('./../validator/user');

router.get('/', PostController.find);
router.get('/:_id', PostController.findById);
router.post('/', UserValidator.authorization, PostController.create);
router.put('/', UserValidator.authorization, PostController.update);
router.delete('/', UserValidator.authorization, PostController.delete);

module.exports = router;
