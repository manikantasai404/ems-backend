const Role = require("../models/Roles");
const router = require("express").Router();

//Add user

router.post("/", async (req, res) => {
  const newRole = new Role(req.body);
  try {
    const savedRole = await newRole.save();
    const { _id, __v, updatedAt, createdAt, ...other } = savedRole._doc;
    res.status(200).json({
      Success: "Role added successfully",
      Data: other,
    });
  } catch (err) {
    res.status(404).json({
      error: "Failed adding role",
      Data: err,
    });
  }
});

//Update user

router.put("/:id", async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { roleId: req.params.id },
      req.body,
      { new: true }
    );
    const { _id, __v, updatedAt, createdAt, ...other } = role._doc;
    res.status(200).json({
      Success: "Role updated successfuly",
      Data: other,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error occured",
      Data: err,
    });
  }
});

//Get role

router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findOne({ email: req.body.email });
    !role &&
      res.status(404).json({
        error: "Role not found",
      });
    const { _id, __v, updatedAt, createdAt, ...other } = role._doc;
    res.status(200).json({
      Success: "Success",
      Data: other,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error occured",
      Data: err,
    });
  }
});

//Ger all roles

router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    !roles &&
      res.status(404).json({
        error: "Roles not found",
      });
    if (roles) {
      var rolesArr = [];
      roles.forEach((element) => {
        const { _id, __v, updatedAt, createdAt, ...other } = element._doc;
        rolesArr.push(other);
      });
    }
    res.status(200).json({
      Success: "Success",
      Data: rolesArr,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error occured",
      Data: err,
    });
  }
});

module.exports = router;
