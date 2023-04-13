const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            required: true
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
    {tyimestamps: true}
);

module.exports = mongoose.model("income", incomeSchema);