const router = require("express").Router();
const Register = require("../models/Register");
const bcrypt = require("bcrypt");
const genericmethod = require("../genericmodels");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //Generate new password
    const hashedPassword = await genericmethod.getHashedPassword(req.body.password);

    //Create new user
    const newUser = new Register({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: !!req.body.isAdmin ? req.body.isAdmin : false,
      isHR: !!req.body.isHR ? req.body.isHR : false,
    });

    //Save user
    const user = await newUser.save();
    const { _id, __v, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json({
      Success: "Registration successful",
      // Data: other,
    });
  } catch (err) {
    res.status(400).json({
      error: "Error occured",
      Data: err,
    });
  }
});

//Update user

router.put("/:id", async (req, res) => {
  try {
    let body = req.body;
    if (!!body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      body.password = hashedPassword;
      console.log(body);
    }

    const user = await Register.findOneAndUpdate(
      { registerId: req.params.id },
      body,
      { new: true }
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

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Register.findOne({ email: req.body.email });
    !user &&
      res.status(404).json({
        error: "User not found",
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(404).json({
        error: "Please enter a valid password",
      });

    const { _id, __v, updatedAt, createdAt, password, ...other } = user._doc;
    res.status(200).json({
      Success: "Login Successfull ",
      Data: other,
    });
  } catch (err) {
    res.status(404).json({
      error: "Error occured",
      Data: err,
    });
  }
});

module.exports = router;
