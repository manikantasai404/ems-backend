const User = require("../models/User");
const router = require("express").Router();

//Add user

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);
  try {
    const savedUser = await newUser.save();
    const { _id, __v, updatedAt, createdAt, ...other } = savedUser._doc;
    res.status(200).json({
      Success: "User added successfully",
      Data: other,
    });
  } catch (err) {
    res.status(403).json({
      error: "Failed adding user",
      Data: err,
    });
  }
});

//Update user

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      req.body
    );
    const { _id, __v, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json({
      Success: "User updated successfuly",
      Data: other,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error occured",
      Data: err,
    });
  }
});

module.exports = router;
