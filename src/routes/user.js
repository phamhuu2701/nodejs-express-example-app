const express = require('express');
const router = express.Router();
const Validator = require('../validator/user');
const Controller = require('../controllers/user');

router.get('/', Controller.find);
router.get('/:_id', Controller.findById);
router.post('/', Controller.create);
router.put('/', Validator.authorization, Controller.update);
// router.delete('/', Validator.authorization, Controller.delete);
router.post('/login', Validator.login, Controller.login);
router.post('/me', Validator.authorization, Controller.getUserByToken);
router.post('/login-facebook', Controller.loginFacebook);
router.post('/login-google', Controller.loginGoogle);

module.exports = router;
