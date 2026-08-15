/**
 * Kora Server — Premium Routes
 */

const express = require("express");
const router = express.Router();
const { auth, optionalAuth } = require("../middleware/auth");
const premiumController = require("../controllers/premiumController");

router.get("/plans", optionalAuth, premiumController.getPlans);
router.get("/status", auth, premiumController.getStatus);
router.post("/subscribe", auth, premiumController.subscribe);

module.exports = router;
