const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const RegisterSchema = new mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
    },
    isHR: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
RegisterSchema.plugin(autoIncrement.plugin, {
  model: "register",
  field: "registerId",
  startAt: 9000000,
  incrementBy: 1,
});

module.exports = mongoose.model("Register", RegisterSchema);
