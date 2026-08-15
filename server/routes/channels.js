/**
 * Kora Server — Channel Routes
 */

const express = require("express");
const router = express.Router();
const { auth, optionalAuth } = require("../middleware/auth");
const channelController = require("../controllers/channelController");

router.get("/", optionalAuth, channelController.listChannels);
router.get("/:id", optionalAuth, channelController.getChannel);
router.post("/", auth, channelController.createChannel);
router.post("/:id/follow", auth, channelController.followChannel);
router.delete("/:id/follow", auth, channelController.unfollowChannel);

module.exports = router;
