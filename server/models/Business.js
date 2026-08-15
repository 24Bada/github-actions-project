/**
 * Kora Server — Business Model
 */

const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessName: { type: String, required: true, trim: true },
    businessEmail: { type: String, required: true, lowercase: true },
    businessPhone: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "", maxlength: 500 },
    logo: { type: String, default: "" },
    address: { type: String, default: "" },
    website: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    // Catalog
    products: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        price: { type: Number, default: 0 },
        currency: { type: String, default: "USD" },
        image: { type: String, default: "" },
        category: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
