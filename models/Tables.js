const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const itemsModel = require("../models/Item");

const TableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      require: true,
      unique: true,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
    orders: {
      type: Array,
      default: [itemsModel],
    },
    customer: {
        type: String,
        default: null
    }
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
TableSchema.plugin(autoIncrement.plugin, {
  model: "tables",
  field: "tableId",
  startAt: 2000000,
  incrementBy: 100,
});

module.exports = mongoose.model("Table", TableSchema);
