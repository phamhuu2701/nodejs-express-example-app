const express = require('express');
const router = express.Router();

const Controller = require('./../controllers/user');
const Validate = require('../validator/user');

router.get('/', Controller.find);
router.post('/', Validate.create, Controller.create);
router.get('/:id', Controller.findById);
router.put('/:id', Validate.authorization, Controller.update);
router.delete('/:id', Controller.delete);

router.post('/login', Validate.login, Controller.login);
router.post('/me', Validate.authorization, Controller.getUserByToken);
// router.post("/login-facebook", Validate.loginFacebook, Controller.loginFacebook);

module.exports = router;
