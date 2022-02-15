const Department = require("../models/Department");
const router = require("express").Router();

//Add department

router.post("/", async (req, res) => {
  const newDepartment = new Department(req.body);
  console.log(newDepartment);
  try {
    const savedDepartment = await newDepartment.save();
    const { _id, __v, updatedAt, createdAt, ...other } = savedDepartment._doc;
    res.status(200).json({
      Success: "Department added successfully",
      Data: other,
    });
  } catch (err) {
    res.status(403).json({
      error: "Failed adding department",
      Data: err,
    });
  }
});

//Delete department

router.delete("/:departmentId", async (req, res) => {
  if (req.params.departmentId) {
    try {
      const department = await Department.findOneAndRemove({
        departmentId: req.params.departmentId,
      });
      if (!department)
        res.status(404).json({
          error: "Department not found",
          Data: department,
        });
      else
        res.status(200).json({
          Success: "Department deleted successfully",
          Data: department,
        });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({
      error: "Error occured",
    });
  }
});

//Get department

router.get("/:departmentId", async (req, res) => {
  if (req.params.departmentId) {
    try {
      const department = await Department.findOne({
        departmentId: req.params.departmentId,
      });
      if (!department) res.status(404).json("Department not found");
      else {
        const { __v, _id, updatedAt, createdAt, ...other } = department._doc;
        res.status(200).json({
          Data: other,
        });
      }
    } catch (err) {
      res.status(500).json({
        error: "Error finding the department",
        Data: err,
      });
    }
  } else {
    res.status(403).json({
      error: "Error occured",
    });
  }
});

// //Update department

// router.put("/:departmentId", async (req, res) => {
//   if (req.params.departmentId) {
//     try {
//       const department = await User.findOneAndUpdate(
//         { departmentId: req.params.departmentId },
//         req.body,
//         { new: true }.select({ _id: 0, _v: 0 })
//       );
//       res.status(200).json({
//         Success: "Account updated successfuly",
//         Data: department,
//       });
//     } catch (err) {
//       res.status(500).json({
//         error: "Error occured",
//         Data: err,
//       });
//     }
//   } else {
//     res.status(403).json({
//       error: "Please pass the department id",
//     });
//   }
// });

//Get department

router.get("/", async (req, res) => {
  try {
    const department = await Department.find();
    res.status(200).json({
      Data: department,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error finding the departments",
      Data: err,
    });
  }
});

module.exports = router;
