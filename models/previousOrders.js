const mongoose = require("mongoose");

const previousOrdersSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["veg", "non-veg", "mocktails", "ice-cream"],
    default: "non-veg",
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  weekday: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("PreviousOrder", previousOrdersSchema);
