const express = require("express");
const router = express.Router();

const Controller = require("../controllers/city");

router.get("/", Controller.find);
router.post("/", Controller.create);
router.get("/:id", Controller.findById);

module.exports = router;
