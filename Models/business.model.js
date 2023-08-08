const mongoose = require("mongoose");

const businessSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      businessdata: { type: String, required: true },
      service: { type: String, required: true },
      phone: { type: String, required: true },
      status: { type: String },
      createdAt: { type: Date, default: Date.now }
    },
    {
      versionKey: false
    }
  );

const business = mongoose.model("business",businessSchema);

module.exports = {business}