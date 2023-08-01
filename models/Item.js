const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const ItemScheme = new mongoose.Schema(
  {
    itemName: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    itemId: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      // default: 50,
    },
    type: {
      type: String,
      enum: ["veg", "non-veg","mocktails","ice-cream"],
      // default: "non-veg",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
ItemScheme.plugin(autoIncrement.plugin, {
  model: "items",
  field: "itemId",
  startAt: 200000,
  incrementBy: 1,
});

module.exports = mongoose.model("Item", ItemScheme);
