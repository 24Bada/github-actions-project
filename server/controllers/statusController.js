/**
 * Kora Server — Status Controller
 */

const Status = require("../models/Status");

async function listStatus(req, res, next) {
  try {
    const statuses = await Status.find({
      expiresAt: { $gt: new Date() },
      $or: [
        { author: req.user._id },
        { visibility: "everyone" },
        { visibility: "contacts" },
        { visibility: "selected", visibleTo: req.user._id },
      ],
    })
      .populate("author", "koraId fullName username avatar")
      .sort({ createdAt: -1 });

    res.json({ success: true, statuses });
  } catch (err) {
    next(err);
  }
}

async function createStatus(req, res, next) {
  try {
    const { type = "text", text, media, background, fontColor, visibility = "everyone" } = req.body;

    const status = await Status.create({
      author: req.user._id,
      type,
      text,
      media: media || {},
      background,
      fontColor,
      visibility,
      visibleTo: req.body.visibleTo || [],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    res.status(201).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function deleteStatus(req, res, next) {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: "Status not found." });
    }

    if (!status.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Can only delete your own status." });
    }

    await status.deleteOne();
    res.json({ success: true, message: "Status deleted." });
  } catch (err) {
    next(err);
  }
}

async function viewStatus(req, res, next) {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) return res.status(404).json({ message: "Status not found." });

    if (!status.viewers.some((v) => v.user.equals(req.user._id))) {
      status.viewers.push({ user: req.user._id, viewedAt: new Date() });
      await status.save();
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listStatus, createStatus, deleteStatus, viewStatus };
