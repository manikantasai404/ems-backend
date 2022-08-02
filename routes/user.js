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


module.exports = router;