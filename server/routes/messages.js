/**
 * Kora Server — Message Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const messageController = require("../controllers/messageController");

router.use(auth);

router.get("/:conversationId", messageController.listMessages);
router.post("/", messageController.sendMessage);
router.delete("/:id", messageController.deleteMessage);
router.patch("/:conversationId/read", messageController.markAsRead);

module.exports = router;
