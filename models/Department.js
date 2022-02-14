const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    departmentId: {
      type: String,
      unique: true,
    },
    membersIn: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
