/**
 * Kora Server — Media Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { upload, uploadMedia } = require("../controllers/mediaController");

router.use(auth);

router.post("/upload", upload.single("file"), uploadMedia);

module.exports = router;
