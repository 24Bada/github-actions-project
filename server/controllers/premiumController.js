/**
 * Kora Server — Premium Controller
 *
 * Handles Kora Premium subscriptions.
 * Does NOT fake payments — returns "coming soon" until Stripe is configured.
 */

const config = require("../config");
const Subscription = require("../models/Subscription");

// Centralized plan configuration
const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    duration: "1 month",
    // Price intentionally not set — owner will provide
    price: null,
    currency: "USD",
  },
  {
    id: "yearly",
    name: "Yearly",
    duration: "12 months",
    price: null,
    currency: "USD",
  },
];

async function getPlans(req, res, next) {
  try {
    res.json({
      success: true,
      plans: PLANS,
      paymentsEnabled: !!config.stripe.secretKey,
      message: config.stripe.secretKey
        ? undefined
        : "Payments coming soon. Premium plans will be available once payment is configured.",
    });
  } catch (err) {
    next(err);
  }
}

async function getStatus(req, res, next) {
  try {
    const sub = await Subscription.findOne({ user: req.user._id });
    res.json({
      success: true,
      isPremium: req.user.isPremium,
      subscription: sub || null,
    });
  } catch (err) {
    next(err);
  }
}

async function subscribe(req, res, next) {
  try {
    if (!config.stripe.secretKey) {
      return res.status(503).json({
        message: "Payments not configured yet. Premium will be available soon.",
      });
    }

    // Real payment flow will go here when Stripe is configured
    res.status(503).json({ message: "Payment integration pending." });
  } catch (err) {
    next(err);
  }
}

module.exports = { getPlans, getStatus, subscribe };
