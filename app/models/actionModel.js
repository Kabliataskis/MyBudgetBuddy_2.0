const mongoose = require("mongoose");

const actionSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }, 
        action: {
            type: String,
            required: true,
        },
        data: {
            type: mongoose.Schema.Types.Mixed
        },
        date: { 
            type: Date, 
            default: Date.now 
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("action", actionSchema);