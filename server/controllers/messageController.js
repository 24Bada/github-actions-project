/**
 * Kora Server — Message Controller
 */

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

async function listMessages(req, res, next) {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      conversation: conversationId,
      deleted: false,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "koraId fullName username avatar isOfficial isPremium");

    res.json({
      success: true,
      messages: messages.reverse(),
      page,
      hasMore: messages.length === limit,
    });
  } catch (err) {
    next(err);
  }
}

async function sendMessage(req, res, next) {
  try {
    const {
      conversationId,
      type = "text",
      text,
      media,
      location,
      replyTo,
    } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    if (!conversation.participants.some((p) => p.equals(req.user._id))) {
      return res.status(403).json({ message: "Not a participant." });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      type,
      text: text || "",
      media: media || {},
      location: location || undefined,
      replyTo: replyTo || null,
      status: "sent",
    });

    // Update conversation's last message
    conversation.lastMessage = message._id;
    conversation.lastMessageText = type === "text" ? text : `[${type}]`;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    await message.populate("sender", "koraId fullName username avatar isOfficial isPremium");

    res.status(201).json({ success: true, message });
  } catch (err) {
    next(err);
  }
}

async function deleteMessage(req, res, next) {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    if (!message.sender.equals(req.user._id)) {
      return res.status(403).json({ message: "Can only delete your own messages." });
    }

    message.deleted = true;
    message.deletedAt = new Date();
    await message.save();

    res.json({ success: true, message: "Message deleted." });
  } catch (err) {
    next(err);
  }
}

async function markAsRead(req, res, next) {
  try {
    const { conversationId } = req.params;

    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: req.user._id },
        "readBy.user": { $ne: req.user._id },
      },
      {
        $addToSet: { readBy: { user: req.user._id, readAt: new Date() } },
        $set: { status: "read" },
      }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listMessages, sendMessage, deleteMessage, markAsRead };
