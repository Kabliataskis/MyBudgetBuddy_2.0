/* eslint-disable linebreak-style */
const bcrypt = require("bcrypt");
const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const {saveAction} = require("./actionController");
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_User = await User.findById(id);
    if (!Delete_User) {
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja` });
    } else {
      if (Delete_User._id != req.userInfo.id) {
        try {
          await User.findByIdAndDelete(id);
          await Income.deleteMany({ user_id: id });
          await Expense.deleteMany({ user_id: id });
          await saveAction(req.userInfo.id, 'user_delete', Delete_User);
          res.status(200).json({
            status: "success",
            message: `Vartotojas nr: ${id} sėkmingai pašalintas.`,
            user: Delete_User,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        return res.status(404).json({ msg: `Negali ištrinti savo paskyros!` });
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
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja` });
    } else {
      if (req.userInfo.id != findUser._id) {
        try {
          const Updated_User = await User.findOneAndUpdate(
            {
              _id: id,
            },
            {
              role: req.body.role,
            },
            {new: true}
          );
          const { password, ...data } = Updated_User._doc;
          await saveAction(req.userInfo.id, 'user_updateRole', data);
          res.json({
            status: 'success',
            data: data
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        return res.status(404).json({ msg: `Negali redaguoti savo rolės` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editUser = async (req, res) => {
  let errors = {};
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja` });
    } else {
      const findUserByEmail = await User.findOne({ email: req.body.email });
        if ((findUserByEmail && findUserByEmail._id == id || !findUserByEmail) || !findUserByEmail) {
          if (!req.body.email) {
            errors.email = "Prašome užpildyti laukelį (El. paštas)";
          } else if (
            !/^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)*@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9][a-zA-Z0-9\-]*)+$/.test(req.body.email)
          ) {
            errors.email = "Neteisingas El. pašto formatas";
          }

          if(Object.keys(errors).length){
            return res.status(404).json({ status: "error", data: errors.email});
          }else{
            let update_pasw;
            if (req.body.password) {
              if (req.body.password.length < 7) {
                errors.password = "Slaptažodis turi būti min. 7 simbolių!";
              } else if (req.body.password.length > 50) {
                errors.password = "Slaptažodis turi būti max. 50 simbolių!";
              } else if (!/\d/.test(req.body.password)) {
                errors.password = "Slaptažodis turi turėti min. 1 skaičių";
              }
              if(Object.keys(errors).length){
                return res.status(404).json({ status: "error", data: errors.password});
              }else{
                const salt = await bcrypt.genSalt(10);
                update_pasw = await bcrypt.hash(req.body.password, salt);
              }
            } else {
              update_pasw = req.body.password;
            }
            try {
              const updated_user = await User.findOneAndUpdate(
                {
                  _id: id,
                },
                {
                  email: req.body.email,
                  password: update_pasw,
                },
                {new: true}
              ).select('-password');
              await saveAction(req.userInfo.id, 'user_edit', updated_user);
              res.json({
                status: "succes",
                data: updated_user
              });
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
          }



        } else {
          return res.status(404).json({ msg: `El. paštas užimtas` });
        }

    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
