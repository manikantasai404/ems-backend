const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");

const HotelCustomersSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      // require: true,
    },
    mobileNumber: {
      type: Number,
      require: true,
    },
    previousOrders: {
      type: Array,
      default: [],
    },
    currentOrders: {
      type: Array,
      default: [],
    },
    tableNumber: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

// autoIncrement.initialize(mongoose.connection);
// HotelCustomersSchema.plugin(autoIncrement.plugin, {
//   model: "hotelusers",
//   field: "mobileNumber",
//   startAt: 10000,
//   incrementBy: 1,
// });

module.exports = mongoose.model("HotelCustomer", HotelCustomersSchema);
