/**
 * Kora Server — Business Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const businessController = require("../controllers/businessController");

router.use(auth);

router.post("/", businessController.createBusiness);
router.get("/", businessController.getBusiness);
router.post("/products", businessController.addProduct);

module.exports = router;
