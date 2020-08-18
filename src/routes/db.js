const express = require("express");
const router = express.Router();

const Controller = require("../controllers/db");

router.get("/create", Controller.create);

module.exports = router;
