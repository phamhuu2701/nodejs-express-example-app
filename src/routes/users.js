const express = require("express");
const router = express.Router();

const Controller = require("./../controllers/user");
const Validate = require("../validator/user");

router.get("/", Controller.find);
router.post("/", Controller.create);
router.get("/:id", Controller.findById);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);

router.post("/login", Validate.login, Controller.login);
router.post("/me", Controller.getProfile);

module.exports = router;
