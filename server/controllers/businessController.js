/**
 * Kora Server — Business Controller
 *
 * Stub: Business features architecture ready for future implementation.
 */

const Business = require("../models/Business");

async function createBusiness(req, res, next) {
  try {
    const { businessName, businessEmail, businessPhone, category, description, address, website } = req.body;

    const existing = await Business.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(409).json({ message: "Business already exists." });
    }

    const business = await Business.create({
      owner: req.user._id,
      businessName,
      businessEmail,
      businessPhone: businessPhone || "",
      category: category || "",
      description: description || "",
      address: address || "",
      website: website || "",
    });

    res.status(201).json({ success: true, business });
  } catch (err) {
    next(err);
  }
}

async function getBusiness(req, res, next) {
  try {
    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({ message: "No business profile found." });
    }
    res.json({ success: true, business });
  } catch (err) {
    next(err);
  }
}

async function addProduct(req, res, next) {
  try {
    const { name, description, price, currency, image, category } = req.body;

    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({ message: "No business profile found." });
    }

    business.products.push({ name, description, price, currency, image, category });
    await business.save();

    res.status(201).json({ success: true, business });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBusiness, getBusiness, addProduct };
