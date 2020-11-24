const express = require('express');
const router = express.Router();

const Controller = require('./../controllers/user');
const Validater = require('./../validator/user');

router.get('/', Controller.find);
router.post('/', Validater.create, Controller.create);
router.get('/:id', Controller.findById);
router.put('/', Validater.authorization, Controller.update);
router.delete('/:id', Controller.delete);

router.post('/login', Controller.login);
router.post('/me', Validater.authorization, Controller.getUserByToken);
// router.post("/login-facebook", Validate.loginFacebook, Controller.loginFacebook);

module.exports = router;
