const express = require("express");
const mintController = require("../controllers/mintController");
const router = express.Router();

router.route("/").post(mintController.mint);

module.exports = router;