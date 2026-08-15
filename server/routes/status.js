/**
 * Kora Server — Status Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const statusController = require("../controllers/statusController");

router.use(auth);

router.get("/", statusController.listStatus);
router.post("/", statusController.createStatus);
router.delete("/:id", statusController.deleteStatus);
router.post("/:id/view", statusController.viewStatus);

module.exports = router;
