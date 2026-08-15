/**
 * Kora Server — Conversation Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const conversationController = require("../controllers/conversationController");

router.use(auth);

router.get("/", conversationController.listConversations);
router.post("/", conversationController.createConversation);
router.get("/:id", conversationController.getConversation);

module.exports = router;
