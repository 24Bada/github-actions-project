/**
 * Kora Server — User Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.use(auth);

router.get("/me", userController.getProfile);
router.patch("/me", userController.updateProfile);
router.patch("/me/privacy", userController.updatePrivacy);
router.get("/search", userController.searchUsers);
router.get("/:id", userController.getUser);

module.exports = router;
