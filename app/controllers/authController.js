const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");

const signToken = (data) => {
  return jwt.sign(data, "secret_1D3._0A$)!_)N@!#()!I*E(AD<02L>?", {
    expiresIn: "1d",
  });
};

exports.getAllUsers = async (req, res) => {
  const { limit = 0 } = req.query;
  try {
    const allUsers = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: allUsers.length,
      data: {
        users: allUsers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_User = await User.findById(id);
    if (!Delete_User) {
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja`});
    } else {
      if(Delete_User._id != req.userInfo.id){
        try{
          const delete_ = await User.findByIdAndDelete(id);
          const deleteUserIncomes = await Income.deleteMany({user_id: id});
          const deleteUserExpenses = await Expense.deleteMany({user_id: id});
          res.status(200).json({
            status: "success",
            message: `Vartotojas nr: ${id} sėkmingai pašalintas.`,
            user: Delete_User,
          });
        }catch (error){
          res.status(500).json({ error: error.message });
        }
      }else{
        return res.status(404).json({ msg: `Negali ištrinti savo paskyros!`});
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja`});
    } else {
      if(req.userInfo.id != findUser._id){
        try{
          await User.updateOne({
                  _id: id,
                },{
                  role: req.body.role
                }
                );
                res.json({
                  success: true,
                })
        }catch (error){
          res.status(500).json({ error: error.message });
        }
      }else{
        return res.status(404).json({ msg: `Negali redaguoti savo rolės`});
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getUser = async (req, res) => {
  try {
    const GetUser = await User.findById(req.params.id).select("-password");
    if (!GetUser) {
      return res.status(404).json({ msg: `Vartotojas id: ${id} neegzistuoja` });
    } else {
      res.status(200).json(GetUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.authRegister = async (req, res) => {
  const userExists = await User.exists({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (userExists) {
    res.status(401).json({
      status: "error",
      mess: "Slapyvardis arba el.paštas užimtas!",
    });
  } else {
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
        username: newUser.username,
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
  }
};

exports.authLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(400).json({
        status: "error",
        mess: "Neteisingas slapyvardis arba slaptažodis",
      });
    if (user) {
      const validatePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validatePass &&
        res.status(400).json({
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

exports.authMe = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userInfo.id });
    !user &&
      res.status(400).json({
        status: "error",
        mess: "Vartotojas nerastas",
      });
    if (user) {
      const { password, ...data } = user._doc;
      res.status(200).json({
        status: "success",
        data: { ...data },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", data: err });
  }
};
