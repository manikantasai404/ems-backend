const mongoose = require("mongoose");

const itsmsSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

const CurrentOrderSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      require: true,
    },
    items: {
      type: [itsmsSchema],
    },
    mobileNumber: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CurrentOrder", CurrentOrderSchema);
