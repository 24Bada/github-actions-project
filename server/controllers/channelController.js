/**
 * Kora Server — Channel Controller
 */

const Channel = require("../models/Channel");

async function listChannels(req, res, next) {
  try {
    const channels = await Channel.find({ isVerified: true })
      .sort({ followerCount: -1 })
      .limit(50)
      .select("name handle description avatar followerCount isVerified category");

    res.json({ success: true, channels });
  } catch (err) {
    next(err);
  }
}

async function createChannel(req, res, next) {
  try {
    const { name, handle, description, category } = req.body;

    const existing = await Channel.findOne({ handle });
    if (existing) {
      return res.status(409).json({ message: "Handle already taken." });
    }

    const channel = await Channel.create({
      name,
      handle,
      description: description || "",
      category: category || "",
      owner: req.user._id,
      admins: [req.user._id],
    });

    res.status(201).json({ success: true, channel });
  } catch (err) {
    next(err);
  }
}

async function getChannel(req, res, next) {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "koraId fullName username avatar")
      .populate("admins", "koraId fullName username avatar");

    if (!channel) return res.status(404).json({ message: "Channel not found." });

    res.json({ success: true, channel });
  } catch (err) {
    next(err);
  }
}

async function followChannel(req, res, next) {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found." });

    if (!channel.followers.includes(req.user._id)) {
      channel.followers.push(req.user._id);
      await channel.save();
    }

    res.json({ success: true, message: "Following channel." });
  } catch (err) {
    next(err);
  }
}

async function unfollowChannel(req, res, next) {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found." });

    channel.followers = channel.followers.filter(
      (f) => !f.equals(req.user._id)
    );
    await channel.save();

    res.json({ success: true, message: "Unfollowed channel." });
  } catch (err) {
    next(err);
  }
}

module.exports = { listChannels, createChannel, getChannel, followChannel, unfollowChannel };
