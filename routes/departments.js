const Department = require("../models/Department");
const router = require("express").Router();

//Add department

router.post("/", async (req, res) => {
  const newDepartment = new Department(req.body);
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

// //Update department

// router.put("/:id", async (req, res) => {
//   if (req.body.userId == req.params.id || req.body.isAdmin) {
//     if (req.body.password) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     }
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       });
//       res.status(200).json("Account updated successfuly");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You can update only your account");
//   }
// });

// //Delete department

// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       if (!user) res.status(404).json("User not found");
//       else res.status(200).json("User deleted successfully");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("Error occured");
//   }
// });

// //Get user

// router.get("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) res.status(404).json("User not found");
//       else {
//         const { password, updatedAt, createdAt, ...other } = user._doc;
//         res.status(200).json(other);
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("Error occured");
//   }
// });

module.exports = router;
