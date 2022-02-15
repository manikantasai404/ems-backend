const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const DepartmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
      required: true,
    },
    departmentId: {
      type: String,
      unique: true,
    },
    membersIn: {
      type: Array,
      default: [],
    },
    headofDepartment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
DepartmentSchema.plugin(autoIncrement.plugin, {
  model: "departments",
  field: "departmentId",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Department", DepartmentSchema);
