const express = require("express");
const router = express.Router();

const UserController = require("./../controllers/user");
const UserValidate = require("./../validations/user");

router.get("/", UserController.find);
router.get("/:id", UserController.findById);

router.post("/login", UserValidate.login, UserController.login);

module.exports = router;
