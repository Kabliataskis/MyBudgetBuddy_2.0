const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (data) => {
  return jwt.sign(data, "secret_1D3._0A$)!_)N@!#()!I*E(AD<02L>?", {
    expiresIn: "1d",
  });
};

exports.authRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const token = signToken({
      id: newUser._id,
      role: newUser.role,
    });
    const { password, ...data } = newUser._doc;
    data.token = token;
    res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ status: "error", mess: err });
  }
};

exports.authLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res
        .status(400)
        .json({
          status: "error",
          mess: "Neteisingas slapyvardis arba slaptažodis",
        });
    if (user) {
      const validatePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validatePass &&
        res
          .status(400)
          .json({
            status: "error",
            mess: "Neteisingas slapyvardis arba slaptažodis",
          });
      if (validatePass) {
        // const token = jwt.sign(
        //   {
        //     id: user._id,
        //     role: user.role,
        //   },
        //   "secret_1D3._0A$)!_)N@!#()!I*E(AD<02L>?",
        //   { expiresIn: "1d" }
        // );
        token = signToken({
          id: user._id,
          role: user.role,
        });
        const { password, ...data } = user._doc;
        res.status(200).json({
          status: "success",
          data: { ...data, token },
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", data: err });
  }
};
