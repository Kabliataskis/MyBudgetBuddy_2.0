const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.authRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const { password, ...data } = newUser._doc;
    console.log(data);
    res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ status: "error", data: err });
  }
};

exports.authLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Neteisingas slapyvardis arba slaptažodis");
    if (user) {
      const validatePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validatePass &&
        res.status(400).json("Neteisingas slapyvardis arba slaptažodis");
      if (validatePass) {
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          "secret_1D3._0A$)!_)N@!#()!I*E(AD<02L>?",
          { expiresIn: "1d" }
        );

        const { password, ...data } = user._doc;
        res.status(200).json({
          status: "success",
          data: {...data, token},
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", data: err });
  }
};
