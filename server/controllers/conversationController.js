/**
 * Kora Server — Conversation Controller
 */

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

async function listConversations(req, res, next) {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "koraId fullName username avatar isOfficial isPremium isOnline lastSeen")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    res.json({ success: true, conversations });
  } catch (err) {
    next(err);
  }
}

async function createConversation(req, res, next) {
  try {
    const { participantId, type = "direct", name } = req.body;

    // For direct chats, check if conversation already exists
    if (type === "direct" && participantId) {
      const existing = await Conversation.findOne({
        type: "direct",
        participants: { $all: [req.user._id, participantId], $size: 2 },
      }).populate("participants", "koraId fullName username avatar isOfficial isPremium isOnline lastSeen");

      if (existing) {
        return res.json({ success: true, conversation: existing });
      }
    }

    const participants = type === "direct"
      ? [req.user._id, participantId]
      : [req.user._id, ...(req.body.participants || [])];

    const conversation = await Conversation.create({
      type,
      name: name || "",
      participants,
      admins: type === "group" ? [req.user._id] : [],
      settings: participants.map((p) => ({ user: p })),
    });

    await conversation.populate("participants", "koraId fullName username avatar isOfficial isPremium isOnline lastSeen");

    res.status(201).json({ success: true, conversation });
  } catch (err) {
    next(err);
  }
}

async function getConversation(req, res, next) {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate("participants", "koraId fullName username avatar isOfficial isPremium isOnline lastSeen")
      .populate("lastMessage");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    if (!conversation.participants.some((p) => p._id.equals(req.user._id))) {
      return res.status(403).json({ message: "Not a participant." });
    }

    res.json({ success: true, conversation });
  } catch (err) {
    next(err);
  }
}

module.exports = { listConversations, createConversation, getConversation };
