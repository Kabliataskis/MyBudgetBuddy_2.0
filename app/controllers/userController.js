/* eslint-disable linebreak-style */
const bcrypt = require("bcrypt");
const Income = require("../models/incomeModel");
const User = require("../models/userModel");

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_User = await User.findById(id);
    if (!Delete_User) {
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja` });
    } else {
      if (Delete_User._id != req.userInfo.id) {
        try {
          const delete_ = await User.findByIdAndDelete(id);
          const deleteUserIncomes = await Income.deleteMany({ user_id: id });
          const deleteUserExpenses = await Expense.deleteMany({ user_id: id });
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
          await User.updateOne(
            {
              _id: id,
            },
            {
              role: req.body.role,
            }
          );
          res.json({
            success: true,
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
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ msg: `Vartotojas nr: ${id} neegzistuoja` });
    } else {
      const findUserByEmail = await User.findOne({ email: req.body.email });
      if (findUserByEmail._id == id || !findUserByEmail) {
        let update_pasw;
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          update_pasw = await bcrypt.hash(req.body.password, salt);
        } else {
          update_pasw = req.body.password;
        }
        try {
          await User.updateOne(
            {
              _id: id,
            },
            {
              email: req.body.email,
              password: update_pasw,
            }
          );
          res.json({
            success: true,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        return res.status(404).json({ msg: `El. paštas užimtas` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getAllIncomes = async (req, res) => {
//   const {limit = 0} = req.query;

//   try {
//     const allIncomes = await Income.find({user_id: req.userInfo.id})
//     .sort({ date: -1 })
//     .limit(limit);

//     res.status(200).json({
//       status: "success",
//       results: allIncomes.length,
//       data: {
//         incomes: allIncomes,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

// exports.getIncome = async (req, res) => {
//   try {
//     const GetIncome = await Income.findById(req.params.id);
//     if (!GetIncome) {
//       return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
//     } else {
//       if(GetIncome.user_id == req.userInfo.id){
//         res.status(200).json(GetIncome);
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }

// };

// exports.addIncome = async (req, res) => {
//   console.log("new income request");
//   try {
//     const newIncome = await Income.create({
//       user_id: req.userInfo.id,
//       title: req.body.title,
//       sum: req.body.sum,
//       date: addTime(req.body.date),
//     });
//     console.log(newIncome);
//     res.status(201).json(newIncome);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ mess: err });
//   }
// };

// exports.deleteIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Delete_Income = await Income.findById(id);
//     if (!Delete_Income) {
//       return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
//     } else {

//       if(Delete_Income.user_id == req.userInfo.id){
//         console.log("true");
//         try{
//           const delete_ = await Income.findByIdAndDelete(id);
//           res.status(200).json({
//             status: "success",
//             message: `Pajamos nr: ${id} sėkmingai pašalintas.`,
//             income: Delete_Income,
//           });
//         }catch (error){
//           res.status(500).json({ error: error.message });
//         }
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.editIncome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Edit_Income = await Income.findById(id);
//     if (!Edit_Income) {
//       return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
//     } else {

//       if(Edit_Income.user_id == req.userInfo.id){
//         console.log("true");
//         try{
//           await Income.updateOne({
//                   _id: id,
//                 },{
//                   user_id: req.userInfo.id,
//                   title: req.body.title,
//                   sum: req.body.sum,
//                   date: addTime(req.body.date),
//                 }
//                 );
//                 res.json({
//                   success: true,
//                 })
//         }catch (error){
//           res.status(500).json({ error: error.message });
//         }
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
