const mongoose = require("mongoose");

const limitSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }, 
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        limit: {
            type: Number,
            required: true
        },
        date: { 
            type: Date, 
            default: Date.now 
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("limit", limitSchema);