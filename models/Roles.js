const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const RolesSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      require: true,
      min:3,
      max: 20,
      unique: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
RolesSchema.plugin(autoIncrement.plugin, {
  model: "role",
  field: "roleId",
  startAt: 18000000,
  incrementBy: 1,
});

module.exports = mongoose.model("Role", RolesSchema);
