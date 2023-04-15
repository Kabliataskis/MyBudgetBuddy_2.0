const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    console.log("new income request");
    try{
        const newIncome = await Income.create({
            user_id: 1,
            title: req.body.title,
            sum: req.body.sum,
            date: req.body.date
        });
        console.log(newIncome);
        res.status(200).json({status: "success", mess: "Įrašas pridėtas sėkmingai!"});
    } catch (err){
        res.status(500).json({mess: err});
    }
};


exports.deleteIncome = async (req, res) => {
    try{

    } catch (err){

    }
};