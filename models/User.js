const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    holidaysList: {
      type: Number,
      default: 0,
    },
    isEmployee: {
      type: Boolean,
      default: true,
    },
    isManager: {
      type: Boolean,
      default: false,
    },
    isTL: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: "person",
  field: "personId",
  startAt: 600000,
  incrementBy: 1,
});

module.exports = mongoose.model("User", UserSchema);
