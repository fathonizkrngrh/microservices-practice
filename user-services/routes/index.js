const express = require("express");
const router = express.Router();
const c = require("../controllers");

router.post("/register", c.createUser);
router.post("/find", c.findOne);

module.exports = router;
