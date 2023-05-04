const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
    {
        user_id: {
            // type: ObjectID,
            type: String,
            required: true
        }, 
        category:{
            type: String,
            required: true,
        },
        title: {
            type: String,
            maxLength: 20,
            required: true,
        },
        sum: {
            type: Number,
            required: true
        },
        date: {
            type: Date
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("expense", expenseSchema);