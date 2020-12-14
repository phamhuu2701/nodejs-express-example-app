const express = require('express');
const router = express.Router();

const Controller = require('../controllers/post');
const Validater = require('./../validator/post');
const UserValidater = require('./../validator/user');

router.get('/', Controller.find);
router.post(
  '/',
  UserValidater.authorization,
  Validater.create,
  Controller.create,
);
router.get('/:id', Controller.findById);
router.put('/:id', UserValidater.authorization, Controller.update);
router.delete('/:id', UserValidater.authorization, Controller.delete);

module.exports = router;
