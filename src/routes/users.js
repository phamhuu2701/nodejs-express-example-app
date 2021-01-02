const express = require('express');
const UserValidator = require('../validator/user');
const router = express.Router();
const UserControllers = require('./../controllers/user');

router.get('/', UserControllers.find);
router.get('/:_id', UserControllers.findById);
router.post('/', UserValidator.create, UserControllers.create);
router.put('/', UserValidator.authorization, UserControllers.update);
// router.delete('/', UserValidator.authorization, UserControllers.delete);
router.post('/login', UserValidator.login, UserControllers.login);
router.post('/me', UserValidator.authorization, UserControllers.getUserByToken);
router.post('/login-facebook', UserControllers.loginFacebook);
router.post('/login-google', UserControllers.loginGoogle);

module.exports = router;
