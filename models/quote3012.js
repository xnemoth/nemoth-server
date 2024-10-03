const mongoose = require("mongoose");

const qouteSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    qoute: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Qoutes = mongoose.model("3012qoutes", qouteSchema, "3012qoutes");

module.exports = Qoutes;