const express = require("express");
const router = express.Router();

const Controller = require("../controllers/post");
const Validate = require("../validator/post");

router.get("/", Controller.find);
router.post("/", Controller.create, Controller.create);
router.get("/:id", Controller.findById);
router.put("/:id", Controller.update);
router.put("/:id/updateUnauthorization", Controller.updateUnauthorization);
router.delete("/:id", Controller.delete);

module.exports = router;
