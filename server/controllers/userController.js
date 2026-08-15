/**
 * Kora Server — User Controller
 */

const User = require("../models/User");

async function getProfile(req, res, next) {
  try {
    res.json({ success: true, user: req.user.toJSON() });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const allowed = ["fullName", "username", "bio", "status", "avatar", "phone"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    // Check username uniqueness if changing
    if (updates.username && updates.username !== req.user.username) {
      const existing = await User.findOne({ username: updates.username });
      if (existing) {
        return res.status(409).json({ message: "Username already taken." });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    );

    res.json({ success: true, user: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

async function searchUsers(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ success: true, users: [] });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { fullName: { $regex: q, $options: "i" } },
        { koraId: { $regex: q, $options: "i" } },
      ],
      _id: { $ne: req.user._id },
    })
      .limit(20)
      .select("koraId fullName username avatar isOfficial isPremium isBusiness");

    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ success: true, user: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

async function updatePrivacy(req, res, next) {
  try {
    const allowed = ["phoneVisible", "avatarVisible", "lastSeen", "onlineStatus", "readReceipts", "statusVisibility"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[`privacy.${key}`] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    );

    res.json({ success: true, user: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile, searchUsers, getUser, updatePrivacy };
