const express = require("express");
const demoController = require("../controllers/demoController");
const router = express.Router();
const { upload } = require("../middleware/multer");

router.route("/tune").post(upload, demoController.createTune);
router.route("/tunes").get(demoController.getTunes);
router.route("/prompts/:id").get(demoController.getPrompts);
router.route("/prompts").post(upload, demoController.createPrompt);


module.exports = router;